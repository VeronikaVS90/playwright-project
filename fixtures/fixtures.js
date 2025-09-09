import base from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { SignUpModal } from "../pages/signUpModal.js";

export const test = base.extend({
  home: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.goto();
    await use(home);
  },
  signUp: async ({ page }, use) => {
    const signUp = new SignUpModal(page);
    await use(signUp);
  },
});

export const expect = test.expect;
