import assert from "node:assert/strict";
import test from "node:test";
import {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
  verifyUnlockToken,
} from "../src/lib/case-auth";

const ORIGINAL_PASSWORD = process.env.CASE_STUDY_PASSWORD;

function setPassword(value: string | undefined) {
  if (value === undefined) {
    delete process.env.CASE_STUDY_PASSWORD;
  } else {
    process.env.CASE_STUDY_PASSWORD = value;
  }
}

test.afterEach(() => {
  setPassword(ORIGINAL_PASSWORD);
});

test("treats missing, empty, and whitespace-only passwords as unconfigured", async () => {
  for (const value of [undefined, "", "   ", "\n\t"] as const) {
    setPassword(value);

    assert.equal(isUnlockConfigured(), false);
    assert.equal(await createUnlockToken("shopify"), null);
    assert.equal(await verifyPassword(value ?? ""), false);
    assert.equal(await verifyUnlockToken("shopify", "anything"), false);
  }
});

test("accepts the exact configured password and slug-bound unlock token", async () => {
  setPassword("correct horse battery staple");

  assert.equal(isUnlockConfigured(), true);
  assert.equal(await verifyPassword("correct horse battery staple"), true);
  assert.equal(await verifyPassword(" correct horse battery staple "), false);

  const token = await createUnlockToken("shopify");
  assert.equal(typeof token, "string");
  assert.equal(await verifyUnlockToken("shopify", token), true);
  assert.equal(await verifyUnlockToken("aightbet", token), false);
});

test("rotating the configured password invalidates existing unlock tokens", async () => {
  setPassword("old password");
  const oldToken = await createUnlockToken("shopify");
  assert.equal(typeof oldToken, "string");

  setPassword("new password");
  assert.equal(await verifyUnlockToken("shopify", oldToken), false);
});
