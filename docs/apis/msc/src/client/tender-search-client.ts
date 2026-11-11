import type { APIRequestContext } from "@playwright/test";
import type { ZodType } from "zod";
import { ContractValidationError, parseAreaResponse, parseCategoryResponse, parsePopularKeywordResponse } from "../parsers/parse.js";
import {
  AreaSearchRequestSchema,
  CategorySearchRequestSchema,
  PopularKeywordRequestSchema,
  type AreaSearchRequest,
  type AreaSearchResponse,
  type CategorySearchRequest,
  type CategorySearchResponse,
  type PopularKeywordRequest,
  type PopularKeywordResponse
} from "../parsers/schemas.js";
import { AREA_PATH, CATEGORY_PATH, POPULAR_KEYWORD_PATH } from "./endpoints.js";

export type TenderClientOptions = {
  baseUrl?: string;
  maxRequests?: number;
  maxConcurrent?: number;
  minIntervalMs?: number;
  timeoutMs?: number;
  maxRetries?: number;
  maxBackoffMs?: number;
  userAgent?: string;
};

export class ApiHttpError extends Error {
  readonly status: number;
  readonly path: string;
  readonly retryAfter?: string;

  constructor(status: number, path: string, retryAfter?: string) {
    super("Portal API returned HTTP " + status + " for " + path);
    this.name = "ApiHttpError";
    this.status = status;
    this.path = path;
    this.retryAfter = retryAfter;
  }
}

export class RequestBudgetError extends Error {
  constructor() {
    super("The configured portal request budget has been reached");
    this.name = "RequestBudgetError";
  }
}

const PORTAL_BASE_URL = "https://muasamcong.mof.gov.vn";

function validateRequest<T>(operation: string, schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new ContractValidationError(operation + " request", result.error.issues);
  return result.data;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class TenderSearchClient {
  private readonly baseUrl: string;
  private readonly maxRequests: number;
  private readonly maxConcurrent: number;
  private readonly minIntervalMs: number;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly maxBackoffMs: number;
  private readonly userAgent: string;
  private requestCount = 0;
  private lastRequestAt = 0;
  private activeRequests = 0;
  private readonly slotWaiters: Array<() => void> = [];
  private startLock: Promise<void> = Promise.resolve();

  constructor(private readonly request: APIRequestContext, options: TenderClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? PORTAL_BASE_URL).replace(/\/+$/, "");
    this.maxRequests = options.maxRequests ?? 10;
    this.maxConcurrent = options.maxConcurrent ?? 1;
    if (!Number.isInteger(this.maxConcurrent) || this.maxConcurrent < 1) {
      throw new RangeError("maxConcurrent must be a positive integer");
    }
    this.minIntervalMs = options.minIntervalMs ?? 2_000;
    this.timeoutMs = options.timeoutMs ?? 15_000;
    this.maxRetries = options.maxRetries ?? 1;
    this.maxBackoffMs = options.maxBackoffMs ?? 10_000;
    this.userAgent = options.userAgent ?? "MSC-Tender-Hunter-Agent/0.1 (low-rate public search research)";
  }

  get requestsSent(): number {
    return this.requestCount;
  }

  async getCategories(input: unknown) {
    const body = validateRequest<CategorySearchRequest>("categories", CategorySearchRequestSchema, input);
    return this.post<CategorySearchResponse>(CATEGORY_PATH, body, parseCategoryResponse);
  }

  async getAreas(input: unknown) {
    const body = validateRequest<AreaSearchRequest>("areas", AreaSearchRequestSchema, input);
    return this.post<AreaSearchResponse>(AREA_PATH, body, parseAreaResponse);
  }

  async getPopularKeywords(input: unknown) {
    const body = validateRequest<PopularKeywordRequest>("popular keywords", PopularKeywordRequestSchema, input);
    return this.post<PopularKeywordResponse>(POPULAR_KEYWORD_PATH, body, parsePopularKeywordResponse);
  }

  private async post<T>(path: string, body: unknown, parse: (input: unknown) => { data: T; unexpectedFields: string[] }) {
    let attempt = 0;
    while (true) {
      const response = await this.sendOnce(path, body);
      if (response.status() === 429) {
        throw new ApiHttpError(response.status(), path, response.headers()["retry-after"]);
      }

      if ([502, 503, 504].includes(response.status()) && attempt < this.maxRetries) {
        const backoff = Math.min(this.maxBackoffMs, 500 * 2 ** attempt);
        attempt += 1;
        await delay(backoff);
        continue;
      }

      if (!response.ok()) {
        throw new ApiHttpError(response.status(), path, response.headers()["retry-after"]);
      }

      return parse(await response.json());
    }
  }

  private async sendOnce(path: string, body: unknown) {
    await this.acquireSlot();
    try {
      await this.reserveRequestStart();
      return await this.request.post(this.baseUrl + path, {
        data: body,
        timeout: this.timeoutMs,
        headers: {
          Accept: "application/json",
          "User-Agent": this.userAgent
        }
      });
    } finally {
      this.releaseSlot();
    }
  }

  private async acquireSlot(): Promise<void> {
    if (this.activeRequests < this.maxConcurrent && this.slotWaiters.length === 0) {
      this.activeRequests += 1;
      return;
    }
    await new Promise<void>((resolve) => this.slotWaiters.push(resolve));
  }

  private releaseSlot(): void {
    const next = this.slotWaiters.shift();
    if (next) {
      next();
      return;
    }
    this.activeRequests -= 1;
  }

  private async reserveRequestStart(): Promise<void> {
    const prior = this.startLock;
    let release = (): void => undefined;
    this.startLock = new Promise<void>((resolve) => {
      release = resolve;
    });
    await prior;
    try {
      if (this.requestCount >= this.maxRequests) throw new RequestBudgetError();
      const waitMs = Math.max(0, this.lastRequestAt + this.minIntervalMs - Date.now());
      if (waitMs > 0) await delay(waitMs);
      this.requestCount += 1;
      this.lastRequestAt = Date.now();
    } finally {
      release();
    }
  }
}
