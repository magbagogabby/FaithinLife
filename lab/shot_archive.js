const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');

(async () => {
  const url = 'file:///C:/faithinlife/pages/FaithInLife/archive.html';
  const outDir = 'C:/faithinlife/pages/FaithInLife/lab';
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  async function shoot(name, width, height) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    await page.screenshot({ path: outDir + '/' + name + '.png', fullPage: true });
    const info = await page.evaluate(() => ({
      cells: document.querySelectorAll('.cell[data-date]').length,
      empty: document.querySelectorAll('.cell--empty').length,
      rows: document.querySelectorAll('.row').length,
      pills: document.querySelectorAll('.pill').length,
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      h: document.body.scrollHeight,
    }));
    console.log(name, JSON.stringify(info));
    await page.close();
  }
  await shoot('archive-desktop', 1440, 1000);
  await shoot('archive-mobile', 390, 844);
  // list view shot
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.click('.tab[data-view="list"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: outDir + '/archive-list.png', fullPage: true });
  console.log('list shot ok');
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
