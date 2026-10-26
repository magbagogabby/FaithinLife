const { chromium } = require('C:/faithinlife/hermes-agent/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const url = 'file:///C:/faithinlife/pages/FaithInLife/archive.html';
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  const read = async () => p.evaluate(() => ({
    title: document.getElementById('mnav-title').textContent,
    count: document.getElementById('mnav-count').textContent,
    visible: Array.from(document.querySelectorAll('.month.on')).map(m => m.dataset.month),
    cells: document.querySelectorAll('.month.on .cell[data-date]').length,
    prevOff: document.getElementById('mnav-prev').disabled,
    nextOff: document.getElementById('mnav-next').disabled,
    hash: location.hash
  }));
  console.log('initial', JSON.stringify(await read()));
  await p.screenshot({ path: 'C:/faithinlife/pages/FaithInLife/lab/nav-month-now.png', fullPage: false });

  await p.click('#mnav-prev'); await p.waitForTimeout(250);
  console.log('prev', JSON.stringify(await read()));
  await p.screenshot({ path: 'C:/faithinlife/pages/FaithInLife/lab/nav-month-prev.png', fullPage: false });

  console.log('prev again (disabled)', await p.evaluate(() => document.getElementById('mnav-prev').disabled));
  await p.click('#mnav-next'); await p.waitForTimeout(250);
  console.log('back-to-newest', JSON.stringify(await read()));

  // keyboard
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(200);
  console.log('arrowLeft', JSON.stringify(await read()));

  // deep link straight to September
  await p.goto(url + '#2026-09', { waitUntil: 'load' }); await p.waitForTimeout(300);
  console.log('deeplink-sept', JSON.stringify(await read()));

  // pills inside the September panel still link out
  console.log('sept pill hrefs', await p.evaluate(() =>
    Array.from(document.querySelectorAll('.month.on .pill')).slice(0, 4).map(a => a.getAttribute('href'))));

  // mobile: list view by default, nav hidden
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await m.goto(url, { waitUntil: 'load' }); await m.waitForTimeout(400);
  console.log('mobile', JSON.stringify(await m.evaluate(() => ({
    calVisible: getComputedStyle(document.getElementById('calendar-view')).display,
    listVisible: getComputedStyle(document.getElementById('list-view')).display,
    navVisible: getComputedStyle(document.getElementById('monthnav')).display,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    rows: document.querySelectorAll('.row').length
  }))));
  await b.close();
})();
