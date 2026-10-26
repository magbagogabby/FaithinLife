const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const url = 'file:///C:/faithinlife/pages/FaithInLife/archive.html';
  for (const [name, hash] of [['oct', '#2026-10'], ['sep', '#2026-09']]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
    await p.goto(url + hash, { waitUntil: 'load' });
    await p.waitForTimeout(400);
    await p.locator('#calendar-view').screenshot({ path: `C:/faithinlife/pages/FaithInLife/lab/nav-${name}-panel.png` });
    const info = await p.evaluate(() => {
      const on = document.querySelector('.month.on');
      const withTopic = Array.from(on.querySelectorAll('.cell[data-date]')).map(c => ({
        d: c.dataset.date, t: (c.querySelector('.topic') || {}).textContent, pills: c.querySelectorAll('.pill').length }));
      return { month: on.dataset.month, days: withTopic.length, topics: withTopic.map(x => x.d + ' ' + (x.t || '-') + ' (' + x.pills + 'p)') };
    });
    console.log(name, JSON.stringify(info, null, 0).slice(0, 900));
    await p.close();
  }
  await b.close();
})();
