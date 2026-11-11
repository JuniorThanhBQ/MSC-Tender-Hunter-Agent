/* SPDX-License-Identifier: MPL-2.0 */

import { expect, test, type APIRequestContext } from "@playwright/test";
import { TenderSearchClient, RequestBudgetError } from "../src/client/tender-search-client.js";
import { AREA_PATH, CATEGORY_PATH, POPULAR_KEYWORD_PATH } from "../src/client/endpoints.js";
import { ContractValidationError, parseAreaResponse, parseCategoryResponse, parsePopularKeywordResponse, parseSearchResponse } from "../src/parsers/parse.js";
import { collectSearchPages, makeSearchRequest } from "../src/client/pagination.js";
import { LocalPortalFixtureServer } from "./fixtures/local-server.js";
import { areaResponse, categoryResponse, popularKeywordResponse, searchResponse } from "./fixtures/samples.js";

const server = new LocalPortalFixtureServer();

test.beforeAll(async () => {
  await server.start();
});

test.afterAll(async () => {
  await server.close();
});

test.beforeEach(() => {
  server.clear();
});

function client(request: APIRequestContext, maxRequests = 10) {
  return new TenderSearchClient(request, {
    baseUrl: server.baseUrl,
    maxRequests,
    minIntervalMs: 0,
    timeoutMs: 2_000,
    maxRetries: 0
  });
}

test("category lookup validates, returns options, and sends a descriptive User-Agent", async ({ request }) => {
  const api = client(request);
  const result = await api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA", "DM_HT_BAOGIA"] });

  expect(result.data.categories.DM_BAOGIA[0].code).toBe("THUOC");
  expect(result.unexpectedFields).toEqual([]);
  expect(server.requests[0].path).toBe(CATEGORY_PATH);
  expect(server.requests[0].userAgent).toContain("MSC-Tender-Hunter-Agent/0.1");
});

test("category lookup accepts an empty map and preserves unexpected fields", () => {
  expect(parseCategoryResponse({ categories: {} }).data.categories).toEqual({});
  const parsed = parseCategoryResponse({
    categories: {
      DM_BAOGIA: [{ code: "THUOC", name: "Gói thầu mua thuốc", nameEn: "Drug purchase package", categoryTypeCode: "DM_BAOGIA", newLabel: true }]
    }
  });
  expect(parsed.unexpectedFields).toContain("$.categories.DM_BAOGIA[].newLabel");
  expect((parsed.data.categories.DM_BAOGIA[0] as Record<string, unknown>).newLabel).toBe(true);
});

test("category request and response validation reject known-field errors", async ({ request }) => {
  const api = client(request);
  await expect(api.getCategories({ categoryTypeCodeLst: 7 })).rejects.toBeInstanceOf(ContractValidationError);
  expect(server.requests).toHaveLength(0);
  expect(() => parseCategoryResponse({ categories: { BAD: [{ code: 7, name: "X", nameEn: "X", categoryTypeCode: "BAD" }] } })).toThrow(ContractValidationError);
});

test("category lookup surfaces 4xx and 5xx without assuming an error envelope", async ({ request }) => {
  const api = client(request);
  server.setResponse(CATEGORY_PATH, 403, { message: "fixture" });
  await expect(api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })).rejects.toMatchObject({ status: 403 });
  server.setResponse(CATEGORY_PATH, 500, { message: "fixture" });
  await expect(api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })).rejects.toMatchObject({ status: 500 });
  expect(server.requests).toHaveLength(2);
});

test("a 429 response is surfaced with Retry-After and is never retried", async ({ request }) => {
  const api = new TenderSearchClient(request, {
    baseUrl: server.baseUrl,
    maxRequests: 3,
    maxConcurrent: 1,
    minIntervalMs: 0,
    maxRetries: 1
  });
  server.setResponse(CATEGORY_PATH, 429, { message: "fixture" }, { "Retry-After": "120" });
  await expect(api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })).rejects.toMatchObject({
    status: 429,
    retryAfter: "120"
  });
  expect(api.requestsSent).toBe(1);
});

test("transient 503 retries once within the configured request budget", async ({ request }) => {
  const api = new TenderSearchClient(request, {
    baseUrl: server.baseUrl,
    maxRequests: 2,
    maxConcurrent: 1,
    minIntervalMs: 0,
    maxRetries: 1,
    maxBackoffMs: 1
  });
  server.setResponse(CATEGORY_PATH, 503, { message: "fixture" });
  await expect(api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })).rejects.toMatchObject({ status: 503 });
  expect(api.requestsSent).toBe(2);
  expect(server.requests).toHaveLength(2);
});

test("concurrency is capped by the configured maximum", async ({ request }) => {
  server.setResponse(CATEGORY_PATH, 200, categoryResponse, {}, 40);
  const api = new TenderSearchClient(request, {
    baseUrl: server.baseUrl,
    maxRequests: 2,
    maxConcurrent: 2,
    minIntervalMs: 0,
    maxRetries: 0
  });
  await Promise.all([
    api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] }),
    api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })
  ]);
  expect(server.maxObservedConcurrent).toBe(2);
});

test("area lookup validates geographic fields and preserves unknown fields", async ({ request }) => {
  const api = client(request);
  const result = await api.getAreas({ areaType: "1", parentCode: "VN" });
  expect(result.data.areas[0].name).toBe("Thành phố Hà Nội");
  expect(result.unexpectedFields).toEqual([]);

  const changed = parseAreaResponse({
    areas: [{ code: "01", areaType: "1", name: "Thành phố Hà Nội", newRegionFlag: "x" }]
  });
  expect(changed.unexpectedFields).toContain("$.areas[].newRegionFlag");
});

test("area validation accepts empty data and rejects wrong known-field types", async ({ request }) => {
  const api = client(request);
  await expect(api.getAreas({ areaType: 1, parentCode: "VN" })).rejects.toBeInstanceOf(ContractValidationError);
  expect(parseAreaResponse({ areas: [] }).data.areas).toEqual([]);
  expect(() => parseAreaResponse({ areas: [{ code: 1 }] })).toThrow(ContractValidationError);
  expect(server.requests).toHaveLength(0);
});

test("area lookup reports 4xx and 5xx statuses", async ({ request }) => {
  const api = client(request);
  server.setResponse(AREA_PATH, 400, { message: "fixture" });
  await expect(api.getAreas({ areaType: "1", parentCode: "VN" })).rejects.toMatchObject({ status: 400 });
  server.clear();
  server.setResponse(AREA_PATH, 503, { message: "fixture" });
  await expect(api.getAreas({ areaType: "1", parentCode: "VN" })).rejects.toMatchObject({ status: 503 });
});

test("popular-keyword lookup validates page metadata and preserves unexpected fields", async ({ request }) => {
  const api = client(request);
  const result = await api.getPopularKeywords({
    pageSize: 100,
    pageNumber: 1,
    sort: "createdDate desc",
    popularKeyword: { status: 1 }
  });
  expect(result.data.page.totalElements).toBe(7);
  expect(result.unexpectedFields).toEqual([]);

  const changed = parsePopularKeywordResponse({
    ...popularKeywordResponse,
    page: {
      ...popularKeywordResponse.page,
      newCursor: "ignored"
    }
  });
  expect(changed.unexpectedFields).toContain("$.page.newCursor");
  expect((changed.data.page as Record<string, unknown>).newCursor).toBe("ignored");
});

test("popular-keyword lookup accepts an empty page and rejects malformed metadata", async ({ request }) => {
  const api = client(request);
  await expect(api.getPopularKeywords({ pageSize: 100, pageNumber: "1", sort: "createdDate desc", popularKeyword: { status: 1 } })).rejects.toBeInstanceOf(ContractValidationError);
  expect(parsePopularKeywordResponse({
    page: {
      content: [],
      totalPages: 0,
      pageSize: 100,
      currentPage: 1,
      totalElements: 0,
      sort: { sorted: true, unsorted: false, empty: false },
      last: true,
      first: true,
      empty: true
    }
  }).data.page.content).toEqual([]);
  expect(() => parsePopularKeywordResponse({ page: { content: [], totalPages: "0" } })).toThrow(ContractValidationError);
  expect(server.requests).toHaveLength(0);
});

test("popular-keyword lookup reports 4xx and 5xx statuses", async ({ request }) => {
  const api = client(request);
  const body = { pageSize: 100, pageNumber: 1, sort: "createdDate desc", popularKeyword: { status: 1 } };
  server.setResponse(POPULAR_KEYWORD_PATH, 404, { message: "fixture" });
  await expect(api.getPopularKeywords(body)).rejects.toMatchObject({ status: 404 });
  server.clear();
  server.setResponse(POPULAR_KEYWORD_PATH, 500, { message: "fixture" });
  await expect(api.getPopularKeywords(body)).rejects.toMatchObject({ status: 500 });
});

test("search request schema accepts the observed shape and rejects invalid field types", () => {
  const request = makeSearchRequest("thiết bị y tế", 10, "0");
  expect(request[0].pageNumber).toBe("0");
  expect(() => makeSearchRequest("thiết bị y tế", "10" as unknown as number, "0")).toThrow(ContractValidationError);
});

test("search parser validates and normalizes observed summary fields", () => {
  const parsed = parseSearchResponse(searchResponse);
  expect(parsed.data.page.content[0].notifyNoStand).toBe("IB2600XXXXXX-00");
  expect(parsed.unexpectedFields).toEqual([]);
});

test("search parser accepts empty results and reports fields outside the observed schema", () => {
  expect(parseSearchResponse({ page: { content: [] } }).data.page.content).toEqual([]);
  const parsed = parseSearchResponse({ page: { content: [], futureCursor: "opaque" } });
  expect(parsed.unexpectedFields).toContain("$.page.futureCursor");
  expect((parsed.data.page as Record<string, unknown>).futureCursor).toBe("opaque");
  expect(() => parseSearchResponse({ page: { content: [{ notifyNo: 7 }] } })).toThrow(ContractValidationError);
});

test("search page iterator stops on a short page and requests string page numbers", async () => {
  const requests: string[] = [];
  const result = await collectSearchPages(async (input) => {
    requests.push(input[0].pageNumber);
    return parseSearchResponse({ page: { content: searchResponse.page.content.slice(0, 1) } });
  }, { keyword: "thiết bị y tế", pageSize: 2, delayMs: 0 });

  expect(result.pagesFetched).toBe(1);
  expect(result.stopReason).toBe("short-page");
  expect(requests).toEqual(["0"]);
  expect(result.items[0].notificationNumber).toBe("IB2600XXXXXX-00");
});

test("search page iterator stops after an empty page at an exact page boundary", async () => {
  const pageNumbers: string[] = [];
  const result = await collectSearchPages(async (input) => {
    pageNumbers.push(input[0].pageNumber);
    const content = input[0].pageNumber === "0" ? searchResponse.page.content.concat(searchResponse.page.content) : [];
    return parseSearchResponse({ page: { content } });
  }, { keyword: "thiết bị y tế", pageSize: 2, maxPages: 5, maxRequests: 5, delayMs: 0 });

  expect(result.stopReason).toBe("empty-page");
  expect(result.pagesFetched).toBe(2);
  expect(pageNumbers).toEqual(["0", "1"]);
});

test("search page iterator enforces the configured request cap", async () => {
  let calls = 0;
  const result = await collectSearchPages(async () => {
    calls += 1;
    return parseSearchResponse({ page: { content: searchResponse.page.content.concat(searchResponse.page.content) } });
  }, { keyword: "thiết bị y tế", pageSize: 2, maxPages: 4, maxRequests: 2, delayMs: 0 });

  expect(result.stopReason).toBe("request-cap");
  expect(result.pagesFetched).toBe(2);
  expect(calls).toBe(2);
});

test("API client enforces its request budget", async ({ request }) => {
  const api = client(request, 1);
  await api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] });
  await expect(api.getCategories({ categoryTypeCodeLst: ["DM_BAOGIA"] })).rejects.toBeInstanceOf(RequestBudgetError);
});

test("fixture examples remain aligned with their response parsers", () => {
  expect(parseAreaResponse(areaResponse).data.areas).toHaveLength(1);
  expect(parseCategoryResponse(categoryResponse).data.categories.DM_HT_BAOGIA).toHaveLength(1);
  expect(parsePopularKeywordResponse(popularKeywordResponse).data.page.content).toHaveLength(1);
});
