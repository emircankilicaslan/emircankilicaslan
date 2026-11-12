// Public repolardaki dil dağılımını GitHub API'sinden okuyup SVG grafik üretir ve README'yi günceller.
// Üçüncü taraf servis kullanılmaz; bağımlılık yoktur (Node 20+).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USER = process.env.GH_USER || 'emircankilicaslan';
const TOKEN = process.env.GITHUB_TOKEN;
const IGNORE_REPOS = new Set([USER]); // profil reposu
const IGNORE_LANGS = new Set(['Dockerfile', 'Batchfile', 'Makefile', 'Shell', 'PowerShell']);
const TOP_N = 6;
const START = '<!-- DIL-ISTATISTIGI:BASLA -->';
const END = '<!-- DIL-ISTATISTIGI:BITIS -->';

export const COLORS = {
  Java: '#b07219', 'C#': '#178600', Python: '#3572A5', PHP: '#4F5D95', TypeScript: '#3178c6',
  JavaScript: '#f1e05a', Go: '#00ADD8', CSS: '#563d7c', HTML: '#e34c26', Dart: '#00B4AB',
  Kotlin: '#A97BFF', 'C++': '#f34b7d', C: '#555555', 'Diğer': '#8b949e',
};
const THEMES = {
  acik: { bg: '#ffffff', border: '#d0d7de', text: '#24292f', muted: '#57606a', tile: '#f6f8fa' },
  koyu: { bg: '#0d1117', border: '#30363d', text: '#e6edf3', muted: '#8b949e', tile: '#161b22' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** { repo: {Dil: bayt} } -> sıralı [{name, bytes, percent}] (ilk TOP_N dil + "Diğer"). */
export function summarizeLanguages(perRepo) {
  const total = {};
  for (const langs of Object.values(perRepo)) {
    for (const [name, bytes] of Object.entries(langs)) {
      if (IGNORE_LANGS.has(name) || !(bytes > 0)) continue;
      total[name] = (total[name] || 0) + bytes;
    }
  }
  const sum = Object.values(total).reduce((a, b) => a + b, 0);
  if (sum === 0) return [];
  const sorted = Object.entries(total).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, TOP_N);
  const rest = sorted.slice(TOP_N).reduce((a, [, b]) => a + b, 0);
  const rows = top.map(([name, bytes]) => ({ name, bytes }));
  if (rest > 0) rows.push({ name: 'Diğer', bytes: rest });
  return rows.map((r) => ({ ...r, percent: (r.bytes / sum) * 100 }));
}

export function buildSvg({ languages, repoCount, stars }, themeName) {
  const t = THEMES[themeName];
  const W = 760, PAD = 24, tileW = Math.floor((W - 2 * PAD - 2 * 12) / 3);
  const font = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
  const barY = 164, legendY = 212, rowH = 26;
  const rows = Math.ceil(languages.length / 2);
  const H = legendY + rows * rowH + 8;

  const tiles = [
    [String(repoCount), 'Proje (public)'],
    [String(stars), 'Toplam yıldız'],
    [String(languages.filter((l) => l.name !== 'Diğer').length), 'Dil'],
  ].map(([value, label], i) => {
    const x = PAD + i * (tileW + 12);
    return `<rect x="${x}" y="84" width="${tileW}" height="60" rx="8" fill="${t.tile}" stroke="${t.border}"/>` +
      `<text x="${x + 16}" y="112" font-size="24" font-weight="700" fill="${t.text}">${esc(value)}</text>` +
      `<text x="${x + 16}" y="132" font-size="12" fill="${t.muted}">${esc(label)}</text>`;
  }).join('');

  let cx = PAD;
  const barW = W - 2 * PAD;
  const segments = languages.map((l) => {
    const w = (l.percent / 100) * barW;
    const seg = `<rect x="${cx.toFixed(2)}" y="${barY}" width="${w.toFixed(2)}" height="14" fill="${COLORS[l.name] || '#8b949e'}"/>`;
    cx += w;
    return seg;
  }).join('');

  const colW = (W - 2 * PAD) / 2;
  const legend = languages.map((l, i) => {
    const x = PAD + (i % 2) * colW, y = legendY + Math.floor(i / 2) * rowH;
    return `<circle cx="${x + 6}" cy="${y}" r="5" fill="${COLORS[l.name] || '#8b949e'}"/>` +
      `<text x="${x + 20}" y="${y + 4}" font-size="13" fill="${t.text}">${esc(l.name)}</text>` +
      `<text x="${x + colW - 24}" y="${y + 4}" font-size="13" fill="${t.muted}" text-anchor="end">${l.percent.toFixed(1)}%</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dil dağılımı">` +
    `<style>text{font-family:${font}}</style>` +
    `<defs><clipPath id="bar"><rect x="${PAD}" y="${barY}" width="${barW}" height="14" rx="7"/></clipPath></defs>` +
    `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="${t.bg}" stroke="${t.border}"/>` +
    `<text x="${PAD}" y="40" font-size="18" font-weight="700" fill="${t.text}">Kod İstatistikleri</text>` +
    `<text x="${PAD}" y="62" font-size="12" fill="${t.muted}">Public repolarımdaki kodun dillere göre dağılımı (bayt)</text>` +
    tiles + `<g clip-path="url(#bar)">${segments}</g>` + legend + `</svg>\n`;
}

export function renderBlock() {
  return `${START}
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/diller-koyu.svg">
  <img alt="Public repolarımdaki dil dağılımı" src="assets/diller-acik.svg">
</picture>
${END}`;
}

/** README'de işaretçiler arasını değiştirir; işaretçi yoksa `anchor` başlığından önce yeni bölüm ekler. */
export function updateReadme(readme, anchor = '### 🚀 Öne Çıkan Projeler') {
  const block = renderBlock();
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  if (re.test(readme)) return readme.replace(re, block);
  const i = readme.indexOf(anchor);
  const section = `### 📊 Kod İstatistikleri\n\n${block}\n\n`;
  return i === -1 ? `${readme.trimEnd()}\n\n${section}` : readme.slice(0, i) + section + readme.slice(i);
}

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { 'User-Agent': 'profil-istatistik', Accept: 'application/vnd.github+json', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`);
  return res.json();
}

async function main() {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await api(`/users/${USER}/repos?type=owner&per_page=100&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const own = repos.filter((r) => !r.fork && !r.private && !IGNORE_REPOS.has(r.name));
  const perRepo = {};
  for (const r of own) perRepo[r.name] = await api(`/repos/${USER}/${r.name}/languages`);

  const data = {
    languages: summarizeLanguages(perRepo),
    repoCount: own.length,
    stars: own.reduce((a, r) => a + r.stargazers_count, 0),
  };
  if (data.languages.length === 0) throw new Error('Dil verisi bulunamadı; dosyalar değiştirilmedi.');

  await mkdir('assets', { recursive: true });
  await writeFile('assets/diller-acik.svg', buildSvg(data, 'acik'));
  await writeFile('assets/diller-koyu.svg', buildSvg(data, 'koyu'));
  const readme = await readFile('README.md', 'utf8');
  await writeFile('README.md', updateReadme(readme));
  console.log(data.languages.map((l) => `${l.name} ${l.percent.toFixed(1)}%`).join(', '));
  console.log(`${data.repoCount} proje, ${data.stars} yıldız`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}