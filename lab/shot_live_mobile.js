const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p.goto('https://magbagogabby.github.io/FaithInLife/archive.html?cb=' + Date.now(), { waitUntil: 'load' });
  await p.waitForTimeout(500);
  await p.screenshot({ path: 'C:/faithinlife/pages/FaithInLife/lab/live-mobile-list.png' });
  console.log(JSON.stringify(await p.evaluate(() => ({
    cal: getComputedStyle(document.getElementById('calendar-view')).display,
    list: getComputedStyle(document.getElementById('list-view')).display,
    overflow: document.documentElement.scrollWidth - window.innerWidth }))));
  await b.close();
})();
