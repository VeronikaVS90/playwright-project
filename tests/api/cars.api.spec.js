import { test, expect, request } from "@playwright/test";
import path from "path";

const STORAGE_PATH = path.resolve("auth/user-storage-state.json");

// API-context with valid auth (storageState + Basic)
async function createAuthedApi(baseURL) {
  return await request.newContext({
    baseURL,
    storageState: STORAGE_PATH,
    httpCredentials: {
      username: process.env.AUTH_USER || "",
      password: process.env.AUTH_PASS || "",
    },
    extraHTTPHeaders: {
      accept: "application/json",
      "content-type": "application/json",
    },
  });
}

async function getValidBrandModel(api) {
  const brandsRes = await api.get("/api/cars/brands");
  expect(brandsRes.ok(), await brandsRes.text()).toBeTruthy();
  const brands = (await brandsRes.json()).data;
  const brandId = brands[0].id;

  const modelsRes = await api.get(`/api/cars/models?carBrandId=${brandId}`);
  expect(modelsRes.ok(), await modelsRes.text()).toBeTruthy();
  const models = (await modelsRes.json()).data;
  const modelId = models[0].id;

  return { brandId, modelId };
}

test.describe("/api/cars POST (create)", () => {
  // Positive test
  test("creating a car with valid data → 200/201", async ({ baseURL }) => {
    const api = await createAuthedApi(baseURL);
    const { brandId, modelId } = await getValidBrandModel(api);

    const res = await api.post("/api/cars", {
      data: { carBrandId: brandId, carModelId: modelId, mileage: 122 },
    });

    expect([200, 201]).toContain(res.status());
    const json = await res.json();

    expect(json.status).toBe("ok");
    expect(json.data).toMatchObject({
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 122,
      initialMileage: 122,
      id: expect.any(Number),
      brand: expect.any(String),
      model: expect.any(String),
    });

    try {
      await api.delete(`/api/cars/${json.data.id}`);
    } catch {}
    await api.dispose();
  });

  // Negative test #1: missing a mileage
  test("missing a mileage → 400 (required)", async ({ baseURL }) => {
    const api = await createAuthedApi(baseURL);
    const { brandId, modelId } = await getValidBrandModel(api);

    const res = await api.post("/api/cars", {
      data: { carBrandId: brandId, carModelId: modelId },
    });

    expect(res.status(), await res.text()).toBe(400);
    const json = await res.json();
    expect(json.status).toBe("error");
    expect(String(json.message)).toMatch(/mileage.*required/i);

    await api.dispose();
  });

  // Negative test #2: without auth
  test("без авторизації → 401 Not authenticated", async ({ baseURL }) => {
    const u = new URL(baseURL);
    u.username = "wrong";
    u.password = "wrong";

    const unauth = await request.newContext({
      baseURL: u.toString(),
      storageState: { cookies: [], origins: [] },
      extraHTTPHeaders: {
        accept: "application/json",
        "content-type": "application/json",
      },
    });

    const res = await unauth.post("/api/cars", {
      data: { carBrandId: 1, carModelId: 1, mileage: 100 },
      failOnStatusCode: false,
    });

    expect(res.status()).toBe(401);

    try {
      const j = await res.json();
      expect(String(j.message || "")).toMatch(
        /not authenticated|unauthorized/i
      );
    } catch {}

    await unauth.dispose();
  });
});
