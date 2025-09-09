import { expect } from "@playwright/test";

export class SignUpModal {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.registerBtn = page.getByRole("button", { name: "Register" });
    this.header = page.locator("h1");
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillLastName(value) {
    await this.lastNameInput.fill(value);
  }

  async fillEmail(value) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value) {
    await this.passwordInput.fill(value);
  }

  async fillRepeatPassword(value) {
    await this.repeatPasswordInput.fill(value);
  }

  async blur() {
    await this.page.locator("body").click();
  }

  async submit() {
    await this.registerBtn.click();
  }

  async expectHeader(text) {
    await expect(this.header).toHaveText(text);
  }

  getErrorByText(text) {
    return this.page.getByText(text, { exact: true });
  }

  async expectFieldRedBorder(field) {
    await expect(field).toHaveCSS("border-color", "rgb(220, 53, 69)");
  }
}
