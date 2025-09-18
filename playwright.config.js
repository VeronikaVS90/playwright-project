import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.AUTH_USER || "",
      password: process.env.AUTH_PASS || "",
    },
    trace: "on",
    screenshot: "on",
    headless: true,
  },

  projects: [
    {
      name: "auth-setup",
      testMatch: /tests\/setup\/auth\.setup\.spec\.js/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth-setup"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["auth-setup"],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      dependencies: ["auth-setup"],
    },
  ],
});
