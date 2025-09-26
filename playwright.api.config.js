import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const STORAGE_STATE = "auth/user-storage-state.json";

export default defineConfig({
  testDir: "./",
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.AUTH_USER || "",
      password: process.env.AUTH_PASS || "",
    },
    storageState: STORAGE_STATE,
    trace: "on",
  },
 
  projects: [
    { name: "api", testMatch: /tests\/api\/.*\.spec\.js/ },
  ],
});
