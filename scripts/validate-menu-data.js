import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve("src/lib");
const TARGET_FILES = [
  "grills-skewers-data.ts",
  "biryani-data.ts",
  "sajji-data.ts",
  "desserts-data.ts",
  "shakes-juices-data.ts",
  "sides-data.ts",
  "doner-data.ts",
  "wraps-data.ts",
];

const VEGAN_CONFLICTS = ["milk", "eggs", "fish", "shellfish"];
const VEGETARIAN_CONFLICTS = ["fish", "shellfish"];
const GLUTEN_FREE_CONFLICTS = ["gluten"];
const DAIRY_FREE_CONFLICTS = ["milk"];
const NUT_FREE_CONFLICTS = ["tree-nuts", "peanuts"];

const getArrayValues = (block, key) => {
  const regex = new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)\\]`, "m");
  const match = block.match(regex);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((value) => value.trim().replace(/^['\"]|['\"]$/g, ""))
    .filter(Boolean);
};

const getName = (block) => {
  const match = block.match(/name\s*:\s*['\"]([^'\"]+)['\"]/m);
  return match ? match[1] : "(unknown)";
};

const objectBlocks = (source) => {
  const blocks = [];
  const objectRegex = /\{[\s\S]*?\}/g;
  let match;
  while ((match = objectRegex.exec(source)) !== null) {
    blocks.push(match[0]);
  }
  return blocks;
};

const violations = [];

for (const file of TARGET_FILES) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) continue;

  const source = fs.readFileSync(filePath, "utf8");

  for (const block of objectBlocks(source)) {
    if (!block.includes("dietary:") || !block.includes("allergens:")) continue;

    const itemName = getName(block);
    const dietary = getArrayValues(block, "dietary");
    const allergens = getArrayValues(block, "allergens");

    const hasAny = (arr) => arr.some((value) => allergens.includes(value));

    if (dietary.includes("vegan") && hasAny(VEGAN_CONFLICTS)) {
      violations.push(`${file} :: ${itemName} => vegan conflicts with allergens [${allergens.join(", ")}]`);
    }

    if (dietary.includes("vegetarian") && hasAny(VEGETARIAN_CONFLICTS)) {
      violations.push(`${file} :: ${itemName} => vegetarian conflicts with allergens [${allergens.join(", ")}]`);
    }

    if (dietary.includes("gluten-free") && hasAny(GLUTEN_FREE_CONFLICTS)) {
      violations.push(`${file} :: ${itemName} => gluten-free conflicts with allergens [${allergens.join(", ")}]`);
    }

    if (dietary.includes("dairy-free") && hasAny(DAIRY_FREE_CONFLICTS)) {
      violations.push(`${file} :: ${itemName} => dairy-free conflicts with allergens [${allergens.join(", ")}]`);
    }

    if (dietary.includes("nut-free") && hasAny(NUT_FREE_CONFLICTS)) {
      violations.push(`${file} :: ${itemName} => nut-free conflicts with allergens [${allergens.join(", ")}]`);
    }
  }
}

if (violations.length > 0) {
  console.error("\n[menu-data validation] Found contradictions:\n");
  for (const issue of violations) {
    console.error(`- ${issue}`);
  }
  console.error("\nFix these conflicts before building.\n");
  process.exit(1);
}

console.log("[menu-data validation] OK");
