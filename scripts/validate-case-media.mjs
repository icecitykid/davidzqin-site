import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const repoRoot = process.cwd();
const caseStudiesPath = path.join(repoRoot, "src/lib/case-studies.ts");
const sourceText = fs.readFileSync(caseStudiesPath, "utf8");
const sourceFile = ts.createSourceFile(
  caseStudiesPath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

const supportedVideoExtensions = new Set([".mp4", ".webm", ".ogg"]);
const errors = [];

function stringValue(node) {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    ? node.text
    : null;
}

function propertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return null;
}

function objectStringProperty(objectNode, key) {
  for (const property of objectNode.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    if (propertyNameText(property.name) !== key) continue;
    return stringValue(property.initializer);
  }
  return null;
}

function checkLocalAsset(src) {
  if (!src.startsWith("/assets/") && src !== "/og.png") return;

  const filePath = path.join(repoRoot, "public", src.slice(1));
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing public asset referenced by case studies: ${src}`);
  }
}

function visit(node) {
  const literalValue = stringValue(node);
  if (literalValue) checkLocalAsset(literalValue);

  if (ts.isObjectLiteralExpression(node)) {
    const type = objectStringProperty(node, "type");
    const src = objectStringProperty(node, "src");

    if (type === "video" && src) {
      const ext = path.extname(src).toLowerCase();
      if (!supportedVideoExtensions.has(ext)) {
        errors.push(
          `Unsupported case-study video extension for ${src}; use one of ${[
            ...supportedVideoExtensions,
          ].join(", ")}.`,
        );
      }
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Case-study media references are valid.");
