import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
  verifyUnlockToken,
} from "./case-auth.ts";

const originalPassword = process.env.CASE_STUDY_PASSWORD;

afterEach(() => {
  if (originalPassword === undefined) {
    delete process.env.CASE_STUDY_PASSWORD;
  } else {
    process.env.CASE_STUDY_PASSWORD = originalPassword;
  }
});

test("blank configured passwords fail closed", async () => {
  process.env.CASE_STUDY_PASSWORD = " \t\n ";

  assert.equal(isUnlockConfigured(), false);
  assert.equal(await verifyPassword(" \t\n "), false);
  assert.equal(await createUnlockToken("shopify"), null);
  assert.equal(await verifyUnlockToken("shopify", "anything"), false);
});

test("configured password ignores accidental environment padding", async () => {
  process.env.CASE_STUDY_PASSWORD = " shared-secret \n";

  const token = await createUnlockToken("shopify");

  assert.equal(isUnlockConfigured(), true);
  assert.equal(await verifyPassword("shared-secret"), true);
  assert.equal(await verifyPassword(" shared-secret \n"), false);
  assert.equal(typeof token, "string");
  assert.equal(await verifyUnlockToken("shopify", token), true);
});
