/* SPDX-License-Identifier: MPL-2.0 */

import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { capturePublicSearch } from "../src/client/browser-search.js";

test("@live one ordinary public UI search response can be captured", async ({ page }, testInfo) => {
  test.skip(process.env.MSC_LIVE_TEST !== "1", "Set MSC_LIVE_TEST=1 to opt in to one public UI request");
  const result = await capturePublicSearch(page, "thiết bị y tế");
  expect(Array.isArray(result.data.page.content)).toBe(true);
  const path = testInfo.outputPath("sanitized-search.har.json");
  await writeFile(path, JSON.stringify({ log: { version: "1.2", creator: { name: "MSC Tender Hunter Agent", version: "0.1" }, entries: [result.sanitizedHarEntry] } }, null, 2), "utf8");
  await testInfo.attach("sanitized-search.har.json", { path, contentType: "application/json" });
});
