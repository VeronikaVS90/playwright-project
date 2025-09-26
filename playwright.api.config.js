import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) throw new Error('Missing BASE_URL env var');
try { new URL(BASE_URL); } catch { throw new Error(`Invalid BASE_URL: ${BASE_URL}`); }

export default defineConfig({
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
   
    httpCredentials: {
      username: process.env.AUTH_USER || '',
      password: process.env.AUTH_PASS || '',
    },
    trace: 'on',
  },
  projects: [{ name: 'api', testMatch: /tests\/api\/.*\.spec\.js/ }],
});

