const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const url = 'https://magbagogabby.github.io/FaithInLife/archive.html';
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(url + '?cb=' + Date.now(), { waitUntil: 'load' });
  await p.waitForTimeout(600);
  const read = async () => p.evaluate(() => ({
    title: document.getElementById('mnav-title').textContent,
    count: document.getElementById('mnav-count').textContent,
    month: (document.querySelector('.month.on') || {}).dataset.month,
    cells: document.querySelectorAll('.month.on .cell[data-date]').length,
    prevOff: document.getElementById('mnav-prev').disabled,
    nextOff: document.getElementById('mnav-next').disabled }));
  console.log('live initial', JSON.stringify(await read()));
  await p.screenshot({ path: 'C:/faithinlife/pages/FaithInLife/lab/live-nav-oct.png' });
  await p.click('#mnav-prev'); await p.waitForTimeout(300);
  console.log('live prev', JSON.stringify(await read()));
  await p.screenshot({ path: 'C:/faithinlife/pages/FaithInLife/lab/live-nav-sep.png' });
  await p.click('#mnav-next'); await p.waitForTimeout(300);
  console.log('live next', JSON.stringify(await read()));
  console.log('live pills total', await p.evaluate(() => document.querySelectorAll('.pill').length));
  console.log('hrefs', await p.evaluate(() => Array.from(new Set(Array.from(document.querySelectorAll('.pill')).map(a => a.href))).length));
  await b.close();
})();
