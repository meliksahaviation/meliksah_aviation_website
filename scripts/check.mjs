import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pages } from '../src/pages.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const errors = [];
for (const {file} of pages) {
  const html = await readFile(resolve(root,file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: yinelenen kimlik`);
  if ((html.match(/<h1[ >]/g)||[]).length !== 1) errors.push(`${file}: tek H1 gerekli`);
  if (!html.includes('<html lang="tr">')) errors.push(`${file}: dil eksik`);
  if (!html.includes('name="description"')) errors.push(`${file}: açıklama eksik`);
  if (/https:\/\/(fonts\.|images\.)/.test(html)) errors.push(`${file}: harici varlık`);
  for (const match of html.matchAll(/(?:href|src)="([^\"]+)"/g)) {
    const url = match[1].replaceAll('&amp;','&');
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [pathQuery,hash] = url.split('#');
    const target = pathQuery.split('?')[0] || file;
    try {
      await access(resolve(root,target));
      if (hash) {
        const other = target===file ? html : await readFile(resolve(root,target),'utf8');
        if (!other.includes(`id="${hash}"`)) errors.push(`${file}: eksik hedef ${url}`);
      }
    } catch { errors.push(`${file}: eksik dosya ${target}`); }
  }
  for (const block of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) {
    try { JSON.parse(block[1]); } catch { errors.push(`${file}: geçersiz yapılandırılmış veri`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`${pages.length} sayfa: yerel bağlantılar, varlıklar, kimlikler, H1, meta açıklamalar ve yapılandırılmış veri geçerli.`);
