/**
 * OGP 画像・favicon・apple-touch-icon を生成する。
 * 実行: npm run assets
 *
 * 元になるのは brand/avatar-master.png（X アカウントと同じ正方形トリミングのアイコン。
 * 配信はしないマスター画像）。アイコンを変えるときはこれを差し替えて再実行する。
 * ページ表示用の public/brand/avatar.webp も合わせて生成される。
 * Featured Apps のアイコンも OGP に並ぶので、featuredApps を変えたときも再実行する。
 */
import sharp from 'sharp';
import { statSync } from 'node:fs';

const OUT = 'public';
const AVATAR = 'brand/avatar-master.png';
const W = 1200;
const H = 630;

const featuredIcons = ['data-jong', 'my-meshi', 'lexlinka'].map((s) => `${OUT}/apps/${s}.png`);

/** 正方形画像を円形に切り抜く */
async function circle(src, size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`,
  );
  return sharp(src)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

/** 角丸（iOS 風スクイーカル相当の単純な角丸）に切り抜く */
async function rounded(src, size, radiusRatio = 0.23) {
  const r = Math.round(size * radiusRatio);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`,
  );
  return sharp(src)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// ---- OGP ----------------------------------------------------------------
const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#11131a"/>
      <stop offset="100%" stop-color="#07080b"/>
    </linearGradient>
    <radialGradient id="g2" cx="0.18" cy="0.1" r="0.8">
      <stop offset="0%" stop-color="#5b8cff" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#5b8cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="0.8" cy="0.5" r="0.6">
      <stop offset="0%" stop-color="#25c07a" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#25c07a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="txt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#c7d0e2"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <rect width="${W}" height="${H}" fill="url(#g3)"/>
  <text x="84" y="286" font-family="Helvetica, Arial, sans-serif" font-size="132" font-weight="bold" fill="url(#txt)" letter-spacing="-3">SUdev</text>
  <text x="90" y="352" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#a2a8b4">Apps made by SUdev.</text>
  <rect x="84" y="560" width="120" height="4" rx="2" fill="#5b8cff"/>
</svg>`;

const iconSize = 128;
const composites = [];
for (const [i, file] of featuredIcons.entries()) {
  composites.push({
    input: await rounded(file, iconSize),
    left: 84 + i * (iconSize + 24),
    top: 400,
  });
}

// 右側にブランドアイコン（X と同じ絵）
const avatarSize = 360;
composites.push({
  input: await circle(AVATAR, avatarSize),
  left: W - avatarSize - 90,
  top: Math.round((H - avatarSize) / 2),
});

await sharp(Buffer.from(bg)).composite(composites).jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/og.jpg`);

// ---- favicon / apple-touch-icon ----------------------------------------
await sharp(await rounded(AVATAR, 180, 0.22)).toFile(`${OUT}/apple-touch-icon.png`);
await sharp(await circle(AVATAR, 64)).toFile(`${OUT}/favicon.png`);

// ページ内で使う軽量版（ヘッダー・X セクション）
await sharp(AVATAR).resize(256, 256, { fit: 'cover' }).webp({ quality: 86 }).toFile(`${OUT}/brand/avatar.webp`);

const kb = (p) => Math.round(statSync(p).size / 1024) + 'KB';
console.log(
  `generated: og.jpg (${kb(`${OUT}/og.jpg`)}), apple-touch-icon.png (${kb(`${OUT}/apple-touch-icon.png`)}), favicon.png (${kb(`${OUT}/favicon.png`)}), brand/avatar.webp (${kb(`${OUT}/brand/avatar.webp`)})`,
);
