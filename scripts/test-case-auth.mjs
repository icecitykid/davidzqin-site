import assert from "node:assert/strict";
import { readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const sourcePath = path.resolve("src/lib/case-auth.ts");
const tempPath = path.join(tmpdir(), `case-auth-${process.pid}.mjs`);

const source = await readFile(sourcePath, "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
});

await writeFile(tempPath, outputText);

const {
  createUnlockToken,
  isUnlockConfigured,
  verifyPassword,
  verifyUnlockToken,
} = await import(`file://${tempPath}`);

test.after(async () => {
  await rm(tempPath, { force: true });
});

test("case study auth fails closed for blank password configuration", async () => {
  const originalPassword = process.env.CASE_STUDY_PASSWORD;

  try {
    delete process.env.CASE_STUDY_PASSWORD;
    assert.equal(isUnlockConfigured(), false);
    assert.equal(await createUnlockToken("shopify"), null);
    assert.equal(await verifyPassword("anything"), false);

    process.env.CASE_STUDY_PASSWORD = "";
    assert.equal(isUnlockConfigured(), false);
    assert.equal(await createUnlockToken("shopify"), null);
    assert.equal(await verifyPassword(""), false);

    process.env.CASE_STUDY_PASSWORD = "   \n\t  ";
    assert.equal(isUnlockConfigured(), false);
    assert.equal(await createUnlockToken("shopify"), null);
    assert.equal(await verifyPassword("   \n\t  "), false);
    assert.equal(await verifyUnlockToken("shopify", "any-token"), false);

    process.env.CASE_STUDY_PASSWORD = "  s3cret pass  ";
    assert.equal(isUnlockConfigured(), true);
    assert.equal(await verifyPassword("s3cret pass"), true);
    assert.equal(await verifyPassword("  s3cret pass  "), false);

    const token = await createUnlockToken("shopify");
    assert.equal(typeof token, "string");
    assert.equal(await verifyUnlockToken("shopify", token), true);
    assert.equal(await verifyUnlockToken("aightbet", token), false);
  } finally {
    if (originalPassword === undefined) {
      delete process.env.CASE_STUDY_PASSWORD;
    } else {
      process.env.CASE_STUDY_PASSWORD = originalPassword;
    }
  }
});
