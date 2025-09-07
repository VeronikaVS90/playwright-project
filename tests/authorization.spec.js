import { test, expect } from "@playwright/test";

test.describe("verifying positive and negative cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Successful registration with valid data", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("Veronika");
    await page.locator("#signupLastName").fill("Sokolova");
    await page.locator("#signupEmail").fill("aqa-veronikavs2@gmail.com");
    await page.locator("#signupPassword").fill("TestPass1234");
    await page.locator("#signupRepeatPassword").fill("TestPass1234");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("h1")).toHaveText("Garage");
  });

  test("Name field - required validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("input#signupName").click();
    await page.locator("body").click();
    await expect(page.locator("p", { hasText: "Name required" })).toHaveText(
      "Name required"
    );
    await expect(page.locator("input#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field - too short validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupName").fill("V");
    await page.locator("body").click();
    await expect(
      page.locator("p", {
        hasText: "Name has to be from 2 to 20 characters long",
      })
    ).toHaveText("Name has to be from 2 to 20 characters long");
  });

  test("Last Name field - required validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("input#signupLastName").click();
    await page.locator("body").click();
    await expect(
      page.locator("p", { hasText: "Last name required" })
    ).toHaveText("Last name required");
    await expect(page.locator("input#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Last name field - too long validation", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.locator("#signupLastName").fill("S".repeat(25));
    await page.locator("body").click();
    await expect(
      page.locator("p", {
        hasText: "Last name has to be from 2 to 20 characters long",
      })
    ).toHaveText("Last name has to be from 2 to 20 characters long");
  });

  test("Email field - entry validation", async ({ page }) => {
    await page.locator("button.hero-descriptor_btn.btn.btn-primary").click();
    await page.locator("input#signupEmail").fill("veronikavsgmail.com");
    await page.locator("input#signupLastName").click();
    await expect(
      page.locator("p", { hasText: "Email is incorrect" })
    ).toHaveText("Email is incorrect");
    await expect(page.locator("input#signupEmail")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field - required validation", async ({ page }) => {
    await page.locator("button.hero-descriptor_btn.btn.btn-primary").click();
    await page.locator("input#signupPassword").click();
    await page.locator("body").click();
    await expect(
      page.locator("p", { hasText: "Password required" })
    ).toHaveText("Password required");
    await expect(page.locator("input#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field - entry validation", async ({ page }) => {
    await page.locator("button.hero-descriptor_btn.btn.btn-primary").click();
    await page.locator("input#signupPassword").fill("123");
    await page.locator("body").click();
    await expect(
      page.locator("p", {
        hasText:
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      })
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await expect(page.locator("input#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Register button should be enabled when all fields are valid", async ({
    page,
  }) => {
    await page.locator("button.hero-descriptor_btn.btn.btn-primary").click();
    await page.locator("input#signupName").fill("Veronika");
    await page.locator("input#signupLastName").fill("Sokolova");
    await page.locator("input#signupEmail").fill("veronikavs@gmail.com");
    await page.locator("input#signupPassword").fill("Autotestjs321");
    await page.locator("input#signupRepeatPassword").fill("Autotestjs321");
    await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
  });
});
