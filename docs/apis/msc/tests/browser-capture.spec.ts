/* SPDX-License-Identifier: MPL-2.0 */

import { expect, test, type Page } from "@playwright/test";
import { capturePublicSearch } from "../src/client/browser-search.js";
import { PORTAL_ORIGIN, SEARCH_PATH } from "../src/client/endpoints.js";
import { ContractValidationError } from "../src/parsers/parse.js";
import { ApiHttpError } from "../src/client/tender-search-client.js";
import { searchResponse } from "./fixtures/samples.js";

const homeUrl = PORTAL_ORIGIN + "/web/guest/home";

async function routePortal(page: Page, status: number, body: unknown): Promise<void> {
  await page.route(PORTAL_ORIGIN + "/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (request.method() === "GET" && url.pathname === "/web/guest/home") {
      await route.fulfill({
        status: 200,
        contentType: "text/html",
        body: [
          "<!doctype html><html><head><meta charset=\"utf-8\"></head><body>",
          "<input placeholder=\"Nhập từ khoá (ví dụ: IB000202 hoặc Mua sắm thiết bị)\">",
          "<button type=\"button\">Tìm kiếm</button>",
          "<script>",
          "document.querySelector('button').addEventListener('click', function () {",
          "const request = [{pageSize:10,pageNumber:'0',query:[{index:'es-contractor-selection',keyWord:document.querySelector('input').value,matchType:'all-1',matchFields:['notifyNo','bidName'],filters:[]}]}];",
          "fetch('" + SEARCH_PATH + "', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request)});",
          "});",
          "</script>",
          "</body></html>"
        ].join("")
      });
      return;
    }
    if (request.method() === "POST" && url.pathname === SEARCH_PATH) {
      await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
      return;
    }
    await route.fulfill({ status: 204, body: "" });
  });
}

test("search happy path captures and validates the normal UI response", async ({ page }) => {
  await routePortal(page, 200, searchResponse);
  const result = await capturePublicSearch(page, "thiết bị y tế", homeUrl);
  expect(result.data.page.content[0].bidName?.[0]).toBe("Mua sắm trang thiết bị y tế");
  expect(result.unexpectedFields).toEqual([]);
  expect(result.sanitizedHarEntry.request.cookies).toEqual([]);
  expect(result.sanitizedHarEntry.request.url).not.toContain("IB2600XXXXXX");
  expect(result.sanitizedHarEntry.response.content.text).not.toContain("IB2600XXXXXX");
});

test("search response listener reports a 4xx status", async ({ page }) => {
  await routePortal(page, 403, { message: "fixture" });
  await expect(capturePublicSearch(page, "thiết bị y tế", homeUrl)).rejects.toBeInstanceOf(ApiHttpError);
});

test("search response listener reports a 5xx status", async ({ page }) => {
  await routePortal(page, 500, { message: "fixture" });
  await expect(capturePublicSearch(page, "thiết bị y tế", homeUrl)).rejects.toMatchObject({ status: 500 });
});

test("search response listener accepts an empty result page", async ({ page }) => {
  await routePortal(page, 200, { page: { content: [] } });
  const result = await capturePublicSearch(page, "no matching tender", homeUrl);
  expect(result.data.page.content).toEqual([]);
});

test("search response listener rejects malformed known fields", async ({ page }) => {
  await routePortal(page, 200, { page: { content: [{ notifyNo: 7 }] } });
  await expect(capturePublicSearch(page, "thiết bị y tế", homeUrl)).rejects.toBeInstanceOf(ContractValidationError);
});

test("search response listener preserves and reports unexpected fields", async ({ page }) => {
  await routePortal(page, 200, { page: { content: [], nextCursor: "opaque" } });
  const result = await capturePublicSearch(page, "thiết bị y tế", homeUrl);
  expect(result.unexpectedFields).toContain("$.page.nextCursor");
});
