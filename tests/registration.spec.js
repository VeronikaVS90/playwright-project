import { test, expect } from "../fixtures/fixtures.js";
import { uniqueEmail } from "../utils/data.js";

test.describe("verifying positive and negative cases (POM, JS)", () => {
  test("Successful registration with valid data", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.fillName("Veronika");
    await signUp.fillLastName("Sokolova");
    await signUp.fillEmail(uniqueEmail());
    await signUp.fillPassword("TestPass1234");
    await signUp.fillRepeatPassword("TestPass1234");
    await signUp.submit();
    await signUp.expectHeader("Garage");
  });

  test("Name field - required validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.clickNameInput();
    await signUp.blur();
    await expect(signUp.getErrorByText("Name required")).toBeVisible();
    await signUp.expectFieldRedBorder(signUp.nameInput);
  });

  test("Name field - too short validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.fillName("V");
    await signUp.blur();
    await expect(
      signUp.getErrorByText("Name has to be from 2 to 20 characters long")
    ).toBeVisible();
  });

  test("Last Name field - required validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.lastNameInput.click();
    await signUp.blur();
    await expect(signUp.getErrorByText("Last name required")).toBeVisible();
    await signUp.expectFieldRedBorder(signUp.lastNameInput);
  });

  test("Last name field - too long validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.lastNameInput.fill("S".repeat(25));
    await signUp.blur();
    await expect(
      signUp.getErrorByText("Last name has to be from 2 to 20 characters long")
    ).toBeVisible();
  });

  test("Email field - entry validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.emailInput.fill("veronikavsgmail.com");
    await signUp.lastNameInput.click();
    await expect(signUp.getErrorByText("Email is incorrect")).toBeVisible();
    await signUp.expectFieldRedBorder(signUp.emailInput);
  });

  test("Password field - required validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.passwordInput.click();
    await signUp.blur();
    await expect(signUp.getErrorByText("Password required")).toBeVisible();
    await signUp.expectFieldRedBorder(signUp.passwordInput);
  });

  test("Password field - entry validation", async ({ home, signUp }) => {
    await home.openSignUp();
    await signUp.passwordInput.fill("123");
    await signUp.blur();
    await expect(
      signUp.getErrorByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
    ).toBeVisible();
    await signUp.expectFieldRedBorder(signUp.passwordInput);
  });

  test("Register button should be enabled when all fields are valid", async ({
    home,
    signUp,
  }) => {
    await home.openSignUp();
    await signUp.fillName("Veronika");
    await signUp.fillLastName("Sokolova");
    await signUp.fillEmail(uniqueEmail("veronikavs"));
    await signUp.fillPassword("Autotestjs321");
    await signUp.fillRepeatPassword("Autotestjs321");
    await expect(signUp.registerBtn).toBeEnabled();
  });
});
