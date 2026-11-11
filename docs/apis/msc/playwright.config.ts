import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],
  outputDir: "test-results",
  use: {
    browserName: "chromium",
    userAgent: "MSC-Tender-Hunter-Agent/0.1 (low-rate public search research)",
    trace: "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});
