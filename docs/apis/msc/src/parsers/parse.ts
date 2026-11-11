import type { ZodIssue, ZodType } from "zod";
import {
  AreaSearchResponseSchema,
  CategorySearchResponseSchema,
  PopularKeywordResponseSchema,
  SearchRequestSchema,
  SearchResponseSchema,
  type AreaSearchResponse,
  type CategorySearchResponse,
  type PopularKeywordResponse,
  type SearchRequest,
  type SearchResponse
} from "./schemas.js";

export type Parsed<T> = {
  data: T;
  unexpectedFields: string[];
};

export class ContractValidationError extends Error {
  readonly issues: ZodIssue[];

  constructor(operation: string, issues: ZodIssue[]) {
    super("Contract validation failed for " + operation);
    this.name = "ContractValidationError";
    this.issues = issues;
  }
}

const knownFields: Record<string, string[]> = {
  "$": ["page", "categories", "areas"],
  "$.page": ["content", "totalPages", "pageSize", "currentPage", "totalElements", "sort", "last", "first", "empty"],
  "$.page.sort": ["sorted", "unsorted", "empty"],
  "$.categories.*[]": ["code", "name", "nameEn", "categoryTypeCode"],
  "$.areas[]": ["code", "areaType", "name", "nameTranslate", "orderIndex", "status", "parentCode", "parent", "parentDTO", "groupCode", "createdDate", "createdBy", "lastModifiedDate", "lastModifiedBy"],
  "$.page.content[]": ["id", "notifyId", "notifyNo", "notifyVersion", "notifyNoStand", "bidName", "investorName", "investorCode", "publicDate", "originalPublicDate", "bidCloseDate", "bidOpenDate", "bidForm", "bidMode", "investField", "bidField", "isInternet", "locations", "processApply", "status", "statusForNotify", "planType", "planNo", "stepCode", "type", "numPetition", "numClarifyReq", "numBidderTech", "numPetitionHsmt", "numPetitionLcnt", "numPetitionKqlcnt", "bidId", "bidNo", "bidPrice", "priceInit", "priceStep", "score", "isMedicine", "isDomestic", "isMultiLot", "workType"],
  "$.page.content[].locations[]": ["provCode", "provName", "districtCode", "districtName", "parentCode", "name"]
};

const popularKeywordKnownFields: Record<string, string[]> = {
  ...knownFields,
  "$.page.content[]": ["id", "keyword", "resultType", "linkUrl", "answerContent", "status", "displayOrder", "createdDate", "updatedDate"]
};

function allowedFor(path: string, fields: Record<string, string[]>): string[] | undefined {
  if (fields[path]) return fields[path];
  if (path.startsWith("$.categories.")) return fields["$.categories.*[]"];
  return undefined;
}

function collectUnexpected(value: unknown, path: string, found: string[], fields: Record<string, string[]>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectUnexpected(item, path.endsWith("[]") ? path : path + "[]", found, fields));
    return;
  }
  if (value === null || typeof value !== "object") return;
  const keys = Object.keys(value);
  const allowed = allowedFor(path, fields);
  if (allowed) {
    for (const key of keys) {
      if (!allowed.includes(key)) found.push(path + "." + key);
    }
  }
  for (const [key, item] of Object.entries(value)) {
    const childPath = path === "$" ? "$." + key : path + "." + key;
    if (Array.isArray(item)) {
      const itemPath = childPath + "[]";
      item.forEach((entry) => collectUnexpected(entry, itemPath, found, fields));
    } else if (item !== null && typeof item === "object") {
      collectUnexpected(item, childPath, found, fields);
    }
  }
}

function parse<T>(operation: string, schema: ZodType<T>, input: unknown, fields = knownFields): Parsed<T> {
  const result = schema.safeParse(input);
  if (!result.success) throw new ContractValidationError(operation, result.error.issues);
  const unexpectedFields: string[] = [];
  collectUnexpected(result.data, "$", unexpectedFields, fields);
  return { data: result.data, unexpectedFields: [...new Set(unexpectedFields)] };
}

export function parseSearchRequest(input: unknown): SearchRequest {
  const result = SearchRequestSchema.safeParse(input);
  if (!result.success) throw new ContractValidationError("search request", result.error.issues);
  return result.data;
}

export function parseSearchResponse(input: unknown): Parsed<SearchResponse> {
  return parse("search", SearchResponseSchema, input);
}

export function parseCategoryResponse(input: unknown): Parsed<CategorySearchResponse> {
  return parse("categories", CategorySearchResponseSchema, input);
}

export function parseAreaResponse(input: unknown): Parsed<AreaSearchResponse> {
  return parse("areas", AreaSearchResponseSchema, input);
}

export function parsePopularKeywordResponse(input: unknown): Parsed<PopularKeywordResponse> {
  return parse("popular keywords", PopularKeywordResponseSchema, input, popularKeywordKnownFields);
}
