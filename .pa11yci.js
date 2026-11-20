// pa11y-ci config for `make a11y`: every built page, in both themes.
// The dark pass clicks the real toggle, so it checks the colours a visitor
// actually gets rather than a forced attribute.
//
// A11Y_SAMPLE=1 (what `make test` uses) checks one page per layout instead of
// all of them; CI runs the full set.
const fs = require('fs');
const path = require('path');

const root = process.env.A11Y_BASE || 'http://localhost:4001';
const site = path.join(__dirname, '_site');

let pages = fs.readdirSync(site, { recursive: true })
  .filter((f) => f.endsWith('.html') && f !== '404.html')
  .map((f) => f.split(path.sep).join('/').replace(/index\.html$/, ''))
  .sort();

if (process.env.A11Y_SAMPLE === '1') {
  // Section indexes (depth <= 1) plus the first generated page in each section.
  const seen = new Set();
  pages = pages.filter((p) => {
    const parts = p.split('/').filter(Boolean);
    if (parts.length <= 1) return true;
    if (seen.has(parts[0])) return false;
    seen.add(parts[0]);
    return true;
  });
}

module.exports = {
  defaults: {
    // Parallel runs hit a Puppeteer race in pa11y-ci 5 ("No target with given id").
    concurrency: 1,
    standard: 'WCAG2AA',
    runners: ['axe'],
    // Pre-existing: the sidebar puts a link inside each <summary>. Fixing it
    // changes how the sidebar behaves, so it is tracked separately.
    ignore: ['nested-interactive'],
    // Theme switching animates colours; let it settle before measuring contrast.
    wait: 1000,
    chromeLaunchConfig: { args: ['--no-sandbox'] },
  },
  urls: pages.map((p) => `${root}/${p}`).flatMap((url) => [
    url,
    // The query string only keeps the two runs apart in the report.
    { url: `${url}?dark`, actions: ['click element #theme-toggle'] },
  ]),
};
