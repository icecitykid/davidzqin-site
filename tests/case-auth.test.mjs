import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";

import {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
  verifyUnlockToken,
} from "../src/lib/case-auth.ts";

const originalPassword = process.env.CASE_STUDY_PASSWORD;

afterEach(() => {
  if (originalPassword === undefined) {
    delete process.env.CASE_STUDY_PASSWORD;
  } else {
    process.env.CASE_STUDY_PASSWORD = originalPassword;
  }
});

describe("case study password auth", () => {
  test("treats unset, empty, and whitespace-only passwords as unconfigured", async () => {
    for (const value of [undefined, "", " ", "\n\t"]) {
      if (value === undefined) {
        delete process.env.CASE_STUDY_PASSWORD;
      } else {
        process.env.CASE_STUDY_PASSWORD = value;
      }

      assert.equal(isUnlockConfigured(), false);
      assert.equal(await createUnlockToken("shopify"), null);
      assert.equal(await verifyPassword(value ?? ""), false);
      assert.equal(await verifyUnlockToken("shopify", "token"), false);
    }
  });

  test("verifies nonblank passwords and slug-bound unlock tokens", async () => {
    process.env.CASE_STUDY_PASSWORD = "correct horse battery staple";

    assert.equal(isUnlockConfigured(), true);
    assert.equal(await verifyPassword("correct horse battery staple"), true);
    assert.equal(await verifyPassword("wrong"), false);

    const token = await createUnlockToken("shopify");
    assert.match(token, /^[a-f0-9]{64}$/);
    assert.equal(await verifyUnlockToken("shopify", token), true);
    assert.equal(await verifyUnlockToken("aightbet", token), false);
  });
});
