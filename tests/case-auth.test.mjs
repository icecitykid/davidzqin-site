import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

const originalPassword = process.env.CASE_STUDY_PASSWORD;
const auth = await import("../src/lib/case-auth.ts");

afterEach(() => {
  if (originalPassword === undefined) {
    delete process.env.CASE_STUDY_PASSWORD;
  } else {
    process.env.CASE_STUDY_PASSWORD = originalPassword;
  }
});

test("treats a whitespace-only case study password as unconfigured", async () => {
  process.env.CASE_STUDY_PASSWORD = " \t\n ";

  assert.equal(auth.isUnlockConfigured(), false);
  assert.equal(await auth.createUnlockToken("shopify"), null);
  assert.equal(await auth.verifyPassword(" \t\n "), false);
  assert.equal(await auth.verifyUnlockToken("shopify", "token"), false);
});

test("keeps configured nonblank passwords exact", async () => {
  process.env.CASE_STUDY_PASSWORD = "  secret  ";

  assert.equal(auth.isUnlockConfigured(), true);
  assert.equal(await auth.verifyPassword("  secret  "), true);
  assert.equal(await auth.verifyPassword("secret"), false);

  const token = await auth.createUnlockToken("shopify");
  assert.equal(typeof token, "string");
  assert.equal(await auth.verifyUnlockToken("shopify", token), true);
});
