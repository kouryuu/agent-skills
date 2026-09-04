import { expect, test } from "@playwright/test";

test("shows the API status", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("API is ready")).toBeVisible();
});
