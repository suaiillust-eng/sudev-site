#!/usr/bin/env node
/**
 * 記事のカテゴリー（topic・topicSlug）を当てたときの画面を撮る（2026-10-17）。**本物の記事ファイルは書き換えない。**
 *
 *   node scripts/preview-topics.mjs <カテゴリーの JSON> <出力フォルダ> [--tmp <一時フォルダの親>]
 *
 * JSON の形: { "<記事の slug>": { "topic": "実況動画づくり", "topicSlug": "video-making" }, ... }
 *
 * 1. サイトを一時フォルダに写し（node_modules はリンク・dist と .git は写さない）、JSON の記事の frontmatter にだけ topic と topicSlug を足す
 * 2. 一時フォルダでビルドし、手元だけの小さなサーバー（127.0.0.1）で配る
 * 3. Chrome のヘッドレス（DevTools の窓口で画面の大きさを模す）で、記事の一覧・カテゴリーのページ（JSON の最初のカテゴリー）・
 *    記事のページ（JSON の最初の記事）・部屋のトップを、パソコン幅（1280）とスマホ幅（390・2 倍の細かさ）でページ全体を撮り、出力フォルダに png で置く
 * 終わったら一時フォルダは消す。
 */
import { execFileSync, spawn } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const args = process.argv.slice(2);
const tmpAt = args.indexOf('--tmp');
const tmpParent = tmpAt >= 0 ? resolve(args[tmpAt + 1]) : tmpdir();
const [jsonPath, outArg] = args.filter((_, i) => i !== tmpAt && i !== tmpAt + 1);
if (jsonPath === undefined || outArg === undefined) {
  console.error('使い方: node scripts/preview-topics.mjs <カテゴリーの JSON> <出力フォルダ> [--tmp <一時フォルダの親>]');
  process.exit(2);
}
if (!existsSync(CHROME)) {
  console.error(`Chrome が見つかりません（${CHROME}）`);
  process.exit(2);
}
const topics = JSON.parse(readFileSync(resolve(jsonPath), 'utf8'));
for (const [slug, t] of Object.entries(topics)) {
  if (typeof t?.topic !== 'string' || t.topic.trim() === '' || !SLUG.test(t?.topicSlug ?? ''))
    throw new Error(`${slug}: topic（日本語の名前）と topicSlug（英小文字・数字・ハイフン）が要ります`);
}
const outDir = resolve(outArg);
mkdirSync(outDir, { recursive: true });

// 1. 写して当てる
mkdirSync(tmpParent, { recursive: true });
const work = mkdtempSync(join(tmpParent, 'sudev-site-topics-'));
cpSync(ROOT, work, {
  recursive: true,
  filter: (src) => {
    const rel = relative(ROOT, src);
    return !(rel === 'node_modules' || rel === 'dist' || rel === '.git' || rel.startsWith(`node_modules/`) || rel.startsWith('dist/') || rel.startsWith('.git/') || rel === '.astro' || rel.startsWith('.astro/'));
  },
});
symlinkSync(join(ROOT, 'node_modules'), join(work, 'node_modules'));
for (const [slug, t] of Object.entries(topics)) {
  const file = join(work, 'src', 'content', 'articles', `${slug}.md`);
  if (!existsSync(file)) throw new Error(`記事が見つかりません: ${slug}`);
  const text = readFileSync(file, 'utf8');
  const match = /^---\n([\s\S]*?)\n---/u.exec(text);
  if (match === null) throw new Error(`frontmatter が読めません: ${slug}`);
  const kept = match[1].split('\n').filter((line) => !/^(topic|topicSlug):/u.test(line));
  const fm = [...kept, `topic: ${JSON.stringify(t.topic)}`, `topicSlug: ${t.topicSlug}`].join('\n');
  writeFileSync(file, `---\n${fm}\n---${text.slice(match[0].length)}`);
}

let server;
try {
  // 2. ビルドして配る
  execFileSync(join(ROOT, 'node_modules', '.bin', 'astro'), ['build'], { cwd: work, stdio: 'inherit', env: { ...process.env, BASE_PATH: '/' } });
  const dist = join(work, 'dist');
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.ico': 'image/x-icon' };
  server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
    let file = join(dist, path);
    if (!file.startsWith(dist)) return res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;

  // 3. 撮る
  const firstArticle = Object.keys(topics)[0];
  const firstTopic = Object.values(topics)[0]?.topicSlug;
  const pages = [
    ['articles', '/suzuha/articles/'],
    ...(firstTopic === undefined ? [] : [[`category-${firstTopic}`, `/suzuha/articles/category/${firstTopic}/`]]),
    ...(firstArticle === undefined ? [] : [[`article-${firstArticle}`, `/suzuha/articles/${firstArticle}/`]]),
    ['room', '/suzuha/'],
  ];
  const sizes = [
    ['pc', 1280, 900, 1, false],
    ['sp', 390, 844, 2, true],
  ];
  const shots = [];
  const chrome = await openChrome(work);
  try {
    for (const [name, path] of pages) {
      for (const [size, width, height, scale, mobile] of sizes) {
        const out = join(outDir, `${name}-${size}.png`);
        writeFileSync(out, await chrome.shot(`${base}${path}`, { width, height, scale, mobile }));
        shots.push(out);
      }
    }
  } finally {
    chrome.close();
  }
  console.log(`撮りました（${shots.length} 枚）:\n${shots.join('\n')}`);
} finally {
  server?.close();
  rmSync(work, { recursive: true, force: true });
}

/**
 * Chrome のヘッドレスを DevTools の窓口（CDP）で動かす。窓の幅の下限（約 500px）に縛られずにスマホの幅を模し、ページ全体を 1 枚で撮る
 */
async function openChrome(work) {
  const profile = join(work, '.chrome');
  mkdirSync(profile, { recursive: true });
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i += 1) await new Promise((r) => setTimeout(r, 100));
  const [port] = readFileSync(portFile, 'utf8').split('\n');
  const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const pageTarget = list.find((t) => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.onopen = r;
    ws.onerror = j;
  });
  let id = 0;
  const waiting = new Map();
  const events = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(String(m.data));
    if (msg.id !== undefined && waiting.has(msg.id)) {
      const { resolve: ok, reject: ng } = waiting.get(msg.id);
      waiting.delete(msg.id);
      if (msg.error) ng(new Error(msg.error.message));
      else ok(msg.result);
    } else if (msg.method !== undefined) events.push(msg.method);
  };
  const send = (method, params = {}) =>
    new Promise((ok, ng) => {
      id += 1;
      waiting.set(id, { resolve: ok, reject: ng });
      ws.send(JSON.stringify({ id, method, params }));
    });
  await send('Page.enable');
  return {
    async shot(url, { width, height, scale, mobile }) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile });
      events.length = 0;
      await send('Page.navigate', { url });
      for (let i = 0; i < 100 && !events.includes('Page.loadEventFired'); i += 1) await new Promise((r) => setTimeout(r, 100));
      // 画像と文字の読み込みを少し待つ
      await new Promise((r) => setTimeout(r, 600));
      const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true });
      return Buffer.from(data, 'base64');
    },
    close() {
      ws.close();
      proc.kill();
    },
  };
}
