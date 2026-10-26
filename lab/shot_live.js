const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');

(async () => {
  const url = 'https://magbagogabby.github.io/FaithInLife/?cb=' + Date.now();
  const outDir = 'C:/faithinlife/pages/FaithInLife/lab';
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });

  async function shoot(name, width, height, full) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    // trigger scroll-reveal animations
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += Math.floor(height * 0.7)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(220);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    const file = outDir + '/' + name + '.png';
    await page.screenshot({ path: file, fullPage: full });
    const h = await page.evaluate(() => document.body.scrollHeight);
    console.log(name, 'ok', width + 'x' + h);
    await page.close();
  }

  await shoot('show-desktop', 1440, 900, true);
  await shoot('show-mobile', 390, 844, true);
  await shoot('show-hero', 1440, 900, false);
  await browser.close();
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
