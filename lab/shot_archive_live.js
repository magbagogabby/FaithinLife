const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');
(async () => {
  const url = 'https://magbagogabby.github.io/FaithInLife/archive.html?cb=' + Date.now();
  const out = 'C:/faithinlife/pages/FaithInLife/lab';
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const p1 = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p1.goto(url, { waitUntil: 'networkidle' });
  await p1.waitForTimeout(800);
  await p1.screenshot({ path: out + '/live-archive-desktop.png', fullPage: true });
  await p1.click('.tab[data-view="list"]');
  await p1.waitForTimeout(400);
  await p1.screenshot({ path: out + '/live-archive-list.png', fullPage: true });
  const chk = await p1.evaluate(() => ({ pills: document.querySelectorAll('.pill').length, cells: document.querySelectorAll('.cell[data-date]').length }));
  const p2 = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p2.goto(url, { waitUntil: 'networkidle' });
  await p2.waitForTimeout(600);
  await p2.screenshot({ path: out + '/live-archive-mobile.png', fullPage: true });
  // hero with the new folio link
  const p3 = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p3.goto('https://magbagogabby.github.io/FaithInLife/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await p3.waitForTimeout(900);
  await p3.screenshot({ path: out + '/live-hero-archive-link.png' });
  console.log('live shots ok', JSON.stringify(chk));
  await b.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
