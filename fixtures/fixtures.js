import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../pages/garagePage";
import path from "path";

const STORAGE_PATH = path.resolve("auth/user-storage-state.json");

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: STORAGE_PATH });
    const page = await context.newPage();

    const garagePage = new GaragePage(page, "/panel/garage");
    await garagePage.open();
    await garagePage.expectLoaded();

    await use(garagePage);
    await context.close();
  },
});

export { expect };
