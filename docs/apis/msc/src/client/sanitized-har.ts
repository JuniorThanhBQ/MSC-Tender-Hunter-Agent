import type { Response } from "@playwright/test";
import type { SearchResponse } from "../parsers/schemas.js";

type HarHeader = {
  name: string;
  value: string;
};

type HeaderSource = {
  headerValue(name: string): Promise<string | null>;
};

export type SanitizedHarEntry = {
  startedDateTime: string;
  time: number;
  request: {
    method: string;
    url: string;
    httpVersion: string;
    cookies: unknown[];
    headers: HarHeader[];
    queryString: Array<{ name: string; value: string }>;
    headersSize: number;
    bodySize: number;
    postData: { mimeType: string; text: string };
  };
  response: {
    status: number;
    statusText: string;
    httpVersion: string;
    cookies: unknown[];
    headers: HarHeader[];
    content: { size: number; mimeType: string; text: string };
    redirectURL: string;
    headersSize: number;
    bodySize: number;
  };
  cache: Record<string, never>;
  timings: Record<string, number>;
};

function searchRequestShape(value: unknown): Record<string, unknown> {
  if (!Array.isArray(value)) return { jsonBody: false };
  return {
    jsonBody: true,
    envelopeCount: value.length,
    envelopes: value.map((item) => {
      if (item === null || typeof item !== "object") return { object: false };
      const record = item as Record<string, unknown>;
      const query = Array.isArray(record.query) ? record.query : [];
      return {
        pageSize: typeof record.pageSize === "number" ? record.pageSize : null,
        pageNumberType: typeof record.pageNumber,
        queryCount: query.length,
        queryFields: query.flatMap((clause) => clause !== null && typeof clause === "object" ? Object.keys(clause as object) : []),
        filterCount: query.flatMap((clause) => clause !== null && typeof clause === "object" && Array.isArray((clause as Record<string, unknown>).filters) ? (clause as Record<string, unknown>).filters as unknown[] : []).length
      };
    })
  };
}

function searchResponseShape(value: SearchResponse): Record<string, unknown> {
  const content = value.page.content;
  return {
    rootKeys: Object.keys(value),
    pageKeys: Object.keys(value.page),
    contentCount: content.length,
    recordFields: [...new Set(content.flatMap((record) => Object.keys(record)))].sort()
  };
}

async function safeHeaders(response: HeaderSource, request: boolean): Promise<HarHeader[]> {
  const names = request
    ? ["content-type", "accept", "user-agent", "referer"]
    : ["content-type", "cache-control", "date"];
  const pairs = await Promise.all(names.map(async (name) => ({ name, value: await response.headerValue(name) })));
  return pairs.flatMap(({ name, value }) => {
    if (!value) return [];
    if (name === "referer") {
      const url = new URL(value);
      return [{ name: "referer", value: url.origin + url.pathname }];
    }
    return [{ name, value }];
  });
}

export async function createSanitizedSearchHarEntry(response: Response, data: SearchResponse): Promise<SanitizedHarEntry> {
  const request = response.request();
  const url = new URL(response.url());
  const queryString = [...url.searchParams.keys()].map((name) => ({ name, value: "[REDACTED]" }));
  const redactedUrl = url.origin + url.pathname + (queryString.length > 0 ? "?" + queryString.map((item) => encodeURIComponent(item.name) + "=%5BREDACTED%5D").join("&") : "");
  const requestHeaders = await safeHeaders(request, true);
  const responseHeaders = await safeHeaders(response, false);
  const requestMime = (await request.headerValue("content-type"))?.split(";")[0] ?? "application/json";
  const responseMime = (await response.headerValue("content-type"))?.split(";")[0] ?? "application/json";

  return {
    startedDateTime: new Date().toISOString(),
    time: -1,
    request: {
      method: request.method(),
      url: redactedUrl,
      httpVersion: "",
      cookies: [],
      headers: requestHeaders,
      queryString,
      headersSize: -1,
      bodySize: -1,
      postData: { mimeType: requestMime, text: JSON.stringify(searchRequestShape(request.postDataJSON())) }
    },
    response: {
      status: response.status(),
      statusText: response.statusText(),
      httpVersion: "",
      cookies: [],
      headers: responseHeaders,
      content: { size: -1, mimeType: responseMime, text: JSON.stringify(searchResponseShape(data)) },
      redirectURL: "",
      headersSize: -1,
      bodySize: -1
    },
    cache: {},
    timings: { blocked: -1, dns: -1, connect: -1, send: -1, wait: -1, receive: -1, ssl: -1 }
  };
}
