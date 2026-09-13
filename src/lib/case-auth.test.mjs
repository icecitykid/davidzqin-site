import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
  verifyUnlockToken,
} from "./case-auth.ts";

const ORIGINAL_PASSWORD = process.env.CASE_STUDY_PASSWORD;

afterEach(() => {
  if (ORIGINAL_PASSWORD === undefined) {
    delete process.env.CASE_STUDY_PASSWORD;
  } else {
    process.env.CASE_STUDY_PASSWORD = ORIGINAL_PASSWORD;
  }
});

describe("case study password wall", () => {
  it("fails closed when the password is unset, empty, or whitespace-only", async () => {
    for (const value of [undefined, "", "   ", "\n\t"]) {
      if (value === undefined) {
        delete process.env.CASE_STUDY_PASSWORD;
      } else {
        process.env.CASE_STUDY_PASSWORD = value;
      }

      assert.equal(isUnlockConfigured(), false);
      assert.equal(await createUnlockToken("shopify"), null);
      assert.equal(await verifyPassword(value ?? ""), false);
      assert.equal(await verifyUnlockToken("shopify", "anything"), false);
    }
  });

  it("accepts a configured password and verifies the matching unlock token", async () => {
    process.env.CASE_STUDY_PASSWORD = "  correct horse battery staple  ";

    assert.equal(isUnlockConfigured(), true);
    assert.equal(await verifyPassword("correct horse battery staple"), true);
    assert.equal(await verifyPassword("  correct horse battery staple  "), false);

    const token = await createUnlockToken("shopify");
    assert.equal(typeof token, "string");
    assert.equal(await verifyUnlockToken("shopify", token), true);
    assert.equal(await verifyUnlockToken("aightbet", token), false);
  });
});
