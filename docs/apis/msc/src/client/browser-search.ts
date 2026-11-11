import type { Page, Response } from "@playwright/test";
import { parseSearchResponse, type Parsed } from "../parsers/parse.js";
import type { SearchResponse } from "../parsers/schemas.js";
import { createSanitizedSearchHarEntry, type SanitizedHarEntry } from "./sanitized-har.js";
import { PORTAL_HOME, PORTAL_ORIGIN, SEARCH_PATH } from "./endpoints.js";
import { ApiHttpError } from "./tender-search-client.js";

export async function capturePublicSearch(
  page: Page,
  keyword: string,
  homeUrl: string = PORTAL_HOME
): Promise<Parsed<SearchResponse> & { sanitizedHarEntry: SanitizedHarEntry }> {
  await page.goto(homeUrl, { waitUntil: "domcontentloaded" });
  await page.getByPlaceholder(/Nhập từ khoá/i).fill(keyword);

  let cleanup = (): void => undefined;
  const responsePromise = new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => {
      page.off("response", onResponse);
      reject(new Error("Timed out waiting for the public tender-search response"));
    }, 30_000);
    const onResponse = (response: Response): void => {
      const request = response.request();
      const url = new URL(response.url());
      if (url.origin === PORTAL_ORIGIN && url.pathname === SEARCH_PATH && request.method() === "POST") {
        clearTimeout(timer);
        page.off("response", onResponse);
        resolve(response);
      }
    };
    cleanup = () => {
      clearTimeout(timer);
      page.off("response", onResponse);
    };
    page.on("response", onResponse);
  });

  try {
    const clickPromise = page.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
    const [response] = await Promise.all([responsePromise, clickPromise]);
    if (!response.ok()) throw new ApiHttpError(response.status(), SEARCH_PATH, response.headers()["retry-after"]);
    const parsed = parseSearchResponse(await response.json());
    return {
      ...parsed,
      sanitizedHarEntry: await createSanitizedSearchHarEntry(response, parsed.data)
    };
  } finally {
    cleanup();
  }
}
