import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, extname, relative, sep } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const allowedRoot = new Set(['index.html','calisma-alanlari.html','urunler.html','ylsy-atlas.html','hakkimizda.html','iletisim.html','gizlilik.html','404.html','styles.css','script.js','robots.txt','sitemap.xml']);
const server = createServer(async (req,res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {'Allow':'GET, HEAD'}); return res.end(); }
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const file = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const target = resolve(root,file);
    const rel = relative(root,target);
    const assetAllowed = rel.startsWith('assets' + sep) && ['.jpg','.png','.svg'].includes(extname(rel));
    if (rel.startsWith('..') || (!allowedRoot.has(rel) && !assetAllowed)) throw new Error('Not found');
    if (!(await stat(target)).isFile()) throw new Error('Not found');
    res.writeHead(200, {'Content-Type':types[extname(target)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD' ? undefined : await readFile(target));
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    res.end(req.method==='HEAD' ? undefined : await readFile(resolve(root,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
