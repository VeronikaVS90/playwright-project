import { test } from "../fixtures/fixtures.js";

test("User is already logged in and sees Garage page", async ({
  userGaragePage,
}) => {
  await userGaragePage.expectLoaded();
});
