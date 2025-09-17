import { test, expect } from "@playwright/test";

test("login and save storage state", async ({ page, context }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator("#signinEmail").fill(process.env.E2E_USER_EMAIL);
  await page.locator("#signinPassword").fill(process.env.E2E_USER_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/panel\/garage/);
  await expect(page.locator("h1")).toHaveText("Garage");

  await context.storageState({ path: "auth/user-storage-state.json" });
});
