import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

test("coverage basico de Playwright", async ({ page }) => {
  await page.coverage.startJSCoverage();

  await page.goto("/");
  await page.goto("/login");

  await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  await page.getByPlaceholder("Tu contraseña").fill("12345678");

  const coverage = await page.coverage.stopJSCoverage();

  const coverageDir = "playwright-coverage";
  fs.mkdirSync(coverageDir, { recursive: true });

  fs.writeFileSync(
    path.join(coverageDir, "coverage.json"),
    JSON.stringify(coverage, null, 2)
  );

  let totalBytes = 0;
  let usedBytes = 0;

  for (const entry of coverage) {
    const sourceLength = entry.source?.length || 0;

    if (!sourceLength) continue;

    totalBytes += sourceLength;

    const usedRanges = [];

    for (const fn of entry.functions) {
      for (const range of fn.ranges) {
        if (range.count > 0) {
          usedRanges.push({
            start: range.startOffset,
            end: range.endOffset,
          });
        }
      }
    }

    usedBytes += mergeRanges(usedRanges).reduce((sum, range) => {
      return sum + range.end - range.start;
    }, 0);
  }

  const percent = totalBytes > 0
    ? ((usedBytes / totalBytes) * 100).toFixed(2)
    : "0.00";

  console.log(`Coverage JS aproximado: ${percent}%`);
  console.log(`Bytes usados: ${usedBytes}`);
  console.log(`Bytes totales: ${totalBytes}`);
  console.log(`Archivos JS medidos: ${coverage.length}`);
});

function mergeRanges(ranges) {
  if (!ranges.length) return [];

  const sorted = ranges.sort((a, b) => a.start - b.start);
  const merged = [sorted[0]];

  for (const range of sorted.slice(1)) {
    const last = merged[merged.length - 1];

    if (range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
    } else {
      merged.push(range);
    }
  }

  return merged;
}