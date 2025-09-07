import { test, expect } from "@playwright/test";

test.describe("verifying positive and negative cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Successful registration with valid data", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("Veronika");
    await page.locator("#signupLastName").fill("Sokolova");
    await page.locator("#signupEmail").fill("aqa-veronikavs3@gmail.com");
    await page.locator("#signupPassword").fill("TestPass1234");
    await page.locator("#signupRepeatPassword").fill("TestPass1234");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("h1")).toHaveText("Garage");
  });

  test("Name field - required validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").click();
    await page.locator("body").click();
    await expect(page.getByText("Name required")).toBeVisible();
    await expect(page.locator("#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field - too short validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("V");
    await page.locator("body").click();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
  });

  test("Last Name field - required validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupLastName").click();
    await page.locator("body").click();
    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(page.locator("#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Last name field - too long validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupLastName").fill("S".repeat(25));
    await page.locator("body").click();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
  });

  test("Email field - entry validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupEmail").fill("veronikavsgmail.com");
    await page.locator("#signupLastName").click();
    await expect(page.getByText("Email is incorrect")).toBeVisible();
    await expect(page.locator("#signupEmail")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field - required validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupPassword").click();
    await page.locator("body").click();
    await expect(page.getByText("Password required")).toBeVisible();
    await expect(page.locator("#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field - entry validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupPassword").fill("123");
    await page.locator("body").click();
    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await expect(page.locator("#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Register button should be enabled when all fields are valid", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("Veronika");
    await page.locator("#signupLastName").fill("Sokolova");
    await page.locator("#signupEmail").fill("veronikavs@gmail.com");
    await page.locator("#signupPassword").fill("Autotestjs321");
    await page.locator("#signupRepeatPassword").fill("Autotestjs321");
    await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
  });
});
