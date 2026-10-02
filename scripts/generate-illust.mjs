/**
 * イラスト掲載用の画像を作る。
 * 実行: npm run illust
 *
 * illust-src/ に元画像（png / jpg / webp）を置くと、長辺 1600px の webp に縮小して
 * public/illust/<同じ名前>.webp へ書き出す。メタデータ（撮影情報・生成AIの埋め込み情報など）は付けない。
 * 最後に src/data/illust.ts の illusts に貼れる行を表示する。
 */
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { extname, basename } from 'node:path';

const SRC = 'illust-src';
const OUT = 'public/illust';
const MAX = 1600;

mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
if (files.length === 0) {
  console.log(`${SRC}/ に画像がありません。`);
  process.exit(0);
}

for (const f of files) {
  const name = `${basename(f, extname(f))}.webp`;
  const info = await sharp(`${SRC}/${f}`)
    .rotate()
    .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`${OUT}/${name}`);
  console.log(`  { file: '${name}', title: '', width: ${info.width}, height: ${info.height} },`);
}
