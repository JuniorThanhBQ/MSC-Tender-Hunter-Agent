import { parseSearchRequest, type Parsed } from "../parsers/parse.js";
import type { SearchRequest, SearchResponse } from "../parsers/schemas.js";
import { normalizeTender, type NormalizedTender } from "../parsers/normalize.js";

export type PaginationOptions = {
  keyword: string;
  pageSize?: number;
  maxPages?: number;
  maxRequests?: number;
  delayMs?: number;
};

export type PaginationResult = {
  items: NormalizedTender[];
  pagesFetched: number;
  stopReason: "empty-page" | "short-page" | "request-cap";
};

export function makeSearchRequest(keyword: string, pageSize: number, pageNumber: string): SearchRequest {
  return parseSearchRequest([
    {
      pageSize,
      pageNumber,
      query: [
        {
          index: "es-contractor-selection",
          keyWord: keyword,
          matchType: "all-1",
          matchFields: ["notifyNo", "bidName"],
          filters: [
            { fieldName: "type", searchType: "in", fieldValues: ["es-notify-contractor"] },
            { fieldName: "caseKHKQ", searchType: "not_in", fieldValues: ["1"] }
          ]
        }
      ]
    }
  ]);
}

export async function collectSearchPages(
  fetchPage: (request: SearchRequest) => Promise<Parsed<SearchResponse>>,
  options: PaginationOptions
): Promise<PaginationResult> {
  const pageSize = options.pageSize ?? 10;
  const maxPages = options.maxPages ?? 10;
  const maxRequests = options.maxRequests ?? 10;
  const delayMs = options.delayMs ?? 2_000;
  const limit = Math.min(maxPages, maxRequests);
  const items: NormalizedTender[] = [];
  let pagesFetched = 0;

  for (let pageIndex = 0; pageIndex < limit; pageIndex += 1) {
    if (pageIndex > 0 && delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    const request = makeSearchRequest(options.keyword, pageSize, String(pageIndex));
    const response = await fetchPage(request);
    const content = response.data.page.content;
    pagesFetched += 1;
    items.push(...content.map(normalizeTender));

    if (content.length === 0) return { items, pagesFetched, stopReason: "empty-page" };
    if (content.length < pageSize) return { items, pagesFetched, stopReason: "short-page" };
  }

  return { items, pagesFetched, stopReason: "request-cap" };
}
