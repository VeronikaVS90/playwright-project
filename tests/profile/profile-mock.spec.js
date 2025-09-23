import { test, expect } from "@playwright/test";

const FIRST = "TestName";
const LAST = "TestLastName";

test("Change name/lastName in the response /api/users/profile", async ({
  page,
  baseURL,
}) => {
  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({
        status: "ok",
        data: {
          userId: 262681,
          photoFilename: "default-user.png",
          name: FIRST,
          lastName: LAST,
        },
      }),
    });
  });

  await page.goto(`${baseURL}/panel/profile`);

  const nameNode = page.locator("p.profile_name");
  await expect(
    nameNode.or(
      page.getByText(new RegExp(`^\\s*${FIRST}\\s+${LAST}\\s*$`, "i"))
    )
  ).toBeVisible({ timeout: 10000 });
});
