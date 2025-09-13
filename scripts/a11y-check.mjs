// scripts/a11y-check.mjs
import fs from "node:fs/promises";
import { AxePuppeteer } from "@axe-core/puppeteer";
import puppeteer from "puppeteer";

const URL = process.env.A11Y_URL || "http://localhost:4321/rdv";
const OUT = process.env.A11Y_OUT || "reports/axe.json";
const IMPACT_FAIL = new Set((process.env.A11Y_IMPACTS || "critical,serious").split(",").map((s) => s.trim()));

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  await page.goto(URL, { waitUntil: "networkidle0" });

  const results = await new AxePuppeteer(page)
    .withTags(["wcag2a", "wcag2aa"]) // AA scope
    .analyze();

  await fs.mkdir("reports", { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(results, null, 2), "utf8");

  await browser.close();

  const violations = results.violations.filter((v) => IMPACT_FAIL.has(v.impact));
  if (violations.length) {
    console.error(`A11y FAIL: ${violations.length} violation(s) ${[...IMPACT_FAIL].join("/")} détectée(s). Voir ${OUT}.`);
    process.exit(1);
  } else {
    console.log(`A11y OK: 0 violation ${[...IMPACT_FAIL].join("/")} — rapport écrit dans ${OUT}`);
  }
})();

