import { chromium } from "playwright";

const url = process.env.TEST_URL ?? "http://localhost:8081/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

const toggle = page.locator("#site-mobile-nav-toggle");
const trigger = page.locator('label[for="site-mobile-nav-toggle"].mobile-nav-trigger');
console.log("toggle in DOM:", (await toggle.count()) > 0);
console.log("trigger visible:", await trigger.isVisible());

await trigger.click();
await page.waitForTimeout(200);

const checked = await toggle.isChecked();
const rootVisible = await page.locator(".mobile-nav-root").evaluate((el) => {
  return window.getComputedStyle(el).display !== "none";
});
const linkCount = await page.locator(".mobile-nav-link").count();
const sample = await page.locator(".mobile-nav-link").first().textContent();

console.log("checked after click:", checked);
console.log("root displayed:", rootVisible);
console.log("link count:", linkCount);
console.log("first link:", sample?.trim());

if (!checked || !rootVisible || linkCount < 5) {
  process.exitCode = 1;
}

await browser.close();
