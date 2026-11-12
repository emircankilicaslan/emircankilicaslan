import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeLanguages, buildSvg, updateReadme, renderBlock } from './profil-istatistik.mjs';

test('diller baytlara göre toplanır, yüzdeler 100 eder, yok sayılanlar elenir', () => {
  const rows = summarizeLanguages({
    a: { Java: 600, Dockerfile: 5000, Python: 200 },
    b: { Java: 200, Python: 0, Go: 0 },
  });
  assert.deepEqual(rows.map((r) => r.name), ['Java', 'Python']);
  assert.equal(rows[0].bytes, 800);
  assert.ok(Math.abs(rows.reduce((s, r) => s + r.percent, 0) - 100) < 1e-9);
  assert.equal(Math.round(rows[0].percent), 80);
});

test('ilk 6 dilden sonrası "Diğer" altında toplanır', () => {
  const langs = Object.fromEntries(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((n, i) => [n, 100 - i * 10]));
  const rows = summarizeLanguages({ r: langs });
  assert.equal(rows.length, 7);
  assert.equal(rows.at(-1).name, 'Diğer');
  assert.equal(rows.at(-1).bytes, 40 + 30);
});

test('veri yoksa boş liste döner', () => {
  assert.deepEqual(summarizeLanguages({}), []);
  assert.deepEqual(summarizeLanguages({ r: { Dockerfile: 10 } }), []);
});

test('SVG her iki temada üretilir, XML özel karakterleri kaçışlanır', () => {
  const data = { languages: [{ name: 'C<#>&', bytes: 1, percent: 100 }], repoCount: 3, stars: 2 };
  for (const theme of ['acik', 'koyu']) {
    const svg = buildSvg(data, theme);
    assert.ok(svg.startsWith('<svg'));
    assert.ok(svg.includes('C&lt;#&gt;&amp;'));
    assert.ok(!svg.includes('C<#>'));
    assert.ok(svg.includes('100.0%'));
  }
  assert.notEqual(buildSvg(data, 'acik'), buildSvg(data, 'koyu'));
});

test('README: işaretçi yoksa bölüm başlığın önüne eklenir, varsa yalnızca arası değişir (idempotent)', () => {
  const base = '# Ben\n\n### 🚀 Öne Çıkan Projeler\n\ntablo\n';
  const once = updateReadme(base);
  assert.ok(once.indexOf('### 📊 Kod İstatistikleri') < once.indexOf('### 🚀 Öne Çıkan Projeler'));
  assert.ok(once.includes(renderBlock()));
  assert.equal(updateReadme(once), once);
  const edited = once.replace('günlük güncellenir', 'ESKI');
  assert.ok(!updateReadme(edited).includes('ESKI'));
});