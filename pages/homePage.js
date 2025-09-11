export class HomePage {
  constructor(page) {
    this.page = page;
    this.signUpBtn = page.getByRole("button", { name: "Sign up" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async openSignUp() {
    await this.signUpBtn.click();
  }
}
