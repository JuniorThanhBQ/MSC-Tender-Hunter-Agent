/* SPDX-License-Identifier: MPL-2.0 */

import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { once } from "node:events";
import { AREA_PATH, CATEGORY_PATH, POPULAR_KEYWORD_PATH, SEARCH_PATH } from "../../src/client/endpoints.js";
import { areaResponse, categoryResponse, popularKeywordResponse, searchResponse } from "./samples.js";

type Override = {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
  delayMs?: number;
};

const defaultResponses: Record<string, unknown> = {
  [CATEGORY_PATH]: categoryResponse,
  [AREA_PATH]: areaResponse,
  [POPULAR_KEYWORD_PATH]: popularKeywordResponse,
  [SEARCH_PATH]: searchResponse
};

export class LocalPortalFixtureServer {
  private server?: Server;
  private readonly overrides = new Map<string, Override>();
  private readonly recorded: Array<{ path: string; body: unknown; userAgent?: string }> = [];
  private activeRequests = 0;
  maxObservedConcurrent = 0;
  baseUrl = "";

  async start(): Promise<void> {
    this.server = createServer((request, response) => {
      void this.handle(request, response);
    });
    this.server.listen(0, "127.0.0.1");
    await once(this.server, "listening");
    const address = this.server.address();
    if (!address || typeof address === "string") throw new Error("Local fixture server did not bind to a TCP port");
    this.baseUrl = "http://127.0.0.1:" + address.port;
  }

  setResponse(path: string, status: number, body: unknown, headers: Record<string, string> = {}, delayMs = 0): void {
    this.overrides.set(path, { status, body, headers, delayMs });
  }

  clear(): void {
    this.overrides.clear();
    this.recorded.length = 0;
    this.maxObservedConcurrent = 0;
  }

  get requests(): Array<{ path: string; body: unknown; userAgent?: string }> {
    return [...this.recorded];
  }

  async close(): Promise<void> {
    if (!this.server) return;
    this.server.close();
    await once(this.server, "close");
    this.server = undefined;
  }

  private async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const rawBody = Buffer.concat(chunks).toString("utf8");
    const url = new URL(request.url ?? "/", this.baseUrl);
    let requestBody: unknown;
    try {
      requestBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      requestBody = null;
    }
    this.recorded.push({
      path: url.pathname,
      body: requestBody,
      userAgent: request.headers["user-agent"]
    });
    const override = this.overrides.get(url.pathname);
    const body = override?.body ?? defaultResponses[url.pathname] ?? { message: "No local fixture for path" };
    const status = override?.status ?? (defaultResponses[url.pathname] ? 200 : 404);
    this.activeRequests += 1;
    this.maxObservedConcurrent = Math.max(this.maxObservedConcurrent, this.activeRequests);
    if (override?.delayMs) await new Promise((resolve) => setTimeout(resolve, override.delayMs));
    response.writeHead(status, {
      "content-type": "application/json; charset=utf-8",
      ...(override?.headers ?? {})
    });
    response.end(JSON.stringify(body));
    this.activeRequests -= 1;
  }
}
