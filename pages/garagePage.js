import { expect } from "@playwright/test";

export class GaragePage {
  constructor(page, path = "/panel/garage") {
    this.page = page;
    this.path = path;
    this.header = page.locator("h1");
  }

  async open() {
    await this.page.goto(this.path);
  }

  async expectLoaded() {
    await expect(this.header).toHaveText("Garage");
    await expect(this.page).toHaveURL(/\/panel\/garage/);
  }
}
