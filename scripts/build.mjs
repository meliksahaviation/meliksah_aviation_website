import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { site } from '../src/site.mjs';
import { pages } from '../src/pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const logoPath = 'assets/meliksah-logo-transparent.png';
const brand = `<img src="${logoPath}" width="58" height="58" alt=""><span>MELİKŞAH<small>AVIATION</small></span>`;
function render(page) {
  const nav = site.nav.map(([label,href])=>`<a href="${href}"${page.file===href || (page.file==='ylsy-atlas.html' && href==='urunler.html')?' aria-current="page"':''}>${label}</a>`).join('');
  const canonical = `${site.url}/${page.file==='index.html'?'':page.file}`;
  const schema = { '@context':'https://schema.org', '@type':'Organization', name:site.name, url:site.url, email:site.email, logo:`${site.url}/${logoPath}` };
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#071422">
  <title>${escape(page.title)}</title>
  <meta name="description" content="${escape(page.description)}">
${page.noindex?'  <meta name="robots" content="noindex">':''}
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/${logoPath}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="${logoPath}" type="image/png">
  <link rel="icon" href="assets/favicon-transparent-v2.svg" type="image/svg+xml" sizes="any">
  <link rel="stylesheet" href="styles.css?v=4">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="script.js" defer></script>
</head>
<body class="${page.file==='index.html'?'home':'inner-page'}">
  <a class="skip-link" href="#main">İçeriğe geç</a>
  <header class="site-header">
    <div class="utility-bar"><div class="wrap"><span>HAVACILIK · MOTOR TEKNOLOJİLERİ · YAZILIM</span><a href="mailto:${site.email}">${site.email}</a></div></div>
    <div class="wrap header-inner">
      <a class="brand" href="index.html" aria-label="Melikşah Aviation ana sayfa">${brand}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menüyü aç"><span></span><span></span></button>
      <nav id="main-nav" class="main-nav" aria-label="Ana menü">${nav}<a class="nav-contact" href="iletisim.html"${page.file==='iletisim.html'?' aria-current="page"':''}>İletişim</a></nav>
    </div>
  </header>
  <main id="main" tabindex="-1">${page.content}</main>
  <footer class="site-footer"><div class="wrap"><div class="footer-grid"><div class="footer-identity"><a class="brand" href="index.html" aria-label="Melikşah Aviation ana sayfa">${brand}</a><p>Havacılık vizyonu.<br>Ürün geliştirme disiplini.</p><a class="footer-email" href="mailto:${site.email}">${site.email}</a></div><nav aria-label="Çalışma alanları"><h2>Çalışma alanları</h2><a href="calisma-alanlari.html#iha">İnsansız hava sistemleri</a><a href="calisma-alanlari.html#motor">Motor ve itki</a><a href="urunler.html">Dijital ürünler</a></nav><nav aria-label="Ürünler ve kurumsal"><h2>Melikşah Aviation</h2><a href="ylsy-atlas.html">YLSY Atlas</a><a href="hakkimizda.html">Kurumsal</a><a href="iletisim.html">İletişim ve iş birliği</a></nav></div><div class="footer-bottom"><span>© <span data-year>${new Date().getFullYear()}</span> Melikşah Aviation. Tüm hakları saklıdır.</span><a href="gizlilik.html">Gizlilik</a><span>Bağımsız teknoloji girişimi.</span></div></div></footer>
</body>
</html>
`;
}
for (const page of pages) await writeFile(resolve(root,page.file),render(page),'utf8');
await mkdir(resolve(root,'assets'),{recursive:true});
// Embed the approved transparent image so the favicon needs no external resource.
// Keep its navy appearance in light tabs; the alpha silhouette turns light in dark tabs.
const logoData = (await readFile(resolve(root,logoPath))).toString('base64');
await writeFile(resolve(root,'assets/favicon-transparent-v2.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254"><style>@media(prefers-color-scheme:dark){image{filter:url(#light-logo)}}</style><defs><filter id="light-logo" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feFlood flood-color="#e8eef6"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><image width="1254" height="1254" href="data:image/png;base64,${logoData}"/></svg>`);
await writeFile(resolve(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(p=>!p.noindex).map(p=>`\n  <url><loc>${site.url}/${p.file==='index.html'?'':p.file}</loc></url>`).join('')}\n</urlset>\n`);
await writeFile(resolve(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`${pages.length} sayfa, sitemap.xml ve robots.txt oluşturuldu.`);
