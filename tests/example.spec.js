import { test, expect } from '@playwright/test';

test('homepage has Playwright in title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('homepage has Get Started link', async ({ page }) => {
  await page.goto('/');
  const getStarted = page.locator('text=Get started');
  await expect(getStarted).toBeVisible();
});

test('can navigate to intro docs', async ({ page }) => {
  await page.goto('/');
  await page.locator('text=Get started').click();
  await expect(page).toHaveURL(/.*docs\/intro/);
});

test('can navigate to API docs', async ({ page }) => {
  await page.goto('/');
  await page.locator('nav >> text=API').click();
  await expect(page).toHaveURL(/.*docs\/api/);
});


