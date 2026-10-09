# SULab 公式サイト

SULab がつくっているアプリを紹介する公式サイト。Astro + 静的書き出し。

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に書き出し
npm run preview  # ビルド結果を確認
npm run assets   # OGP画像・favicon・ヘッダー用アバターを再生成
```

## 中身を編集する

### アプリを追加・編集する

`src/data/apps.ts` の `apps` 配列だけを編集すれば、トップページのカードも詳細ページ
（`/apps/<slug>`）も自動で増える。

```ts
{
  slug: 'new-app',          // URL になる（/apps/new-app）
  name: 'アプリ名',          // サイト上の正式名称
  tagline: '一行キャッチ',
  summary: '一覧カード用の短い説明（1〜2文）',
  description: '詳細ページ用の説明（数文）',
  features: [{ title: '機能名', body: '説明' }],
  kind: 'app',              // 'app'（既定）/ 'game'。将来ゲームが増えたら 'game' を付ける
  status: 'released',       // 'released' = 公開済み / 'development' = 開発中（現在は0本）
  icon: '/apps/new-app.png',// 画像が無ければ '' にすると頭文字のタイルが出る
  accent: '#5b8cff',        // カードのアクセントカラー
  appStoreUrl: '',          // 空ならボタンは表示されない
  notice: 'Android テスター募集中',  // 任意。カードと詳細ページにバッジで出る。不要なら行ごと消す
  screenshots: [],
  platforms: ['iOS'],
}
```

- `status: 'released'` かつ Featured 以外 → トップの **All Apps** に表示
- 現在は全12本が `status: 'released'`。開発中セクションはページから外してある
  （`status: 'development'` のアプリを足しても、今はどこにも表示されない）

### 涼葉の部屋（/suzuha/）

SULab の AI キャラクター「涼葉」の部屋。サイト全体はダークテーマのまま、部屋の中だけ明るいテーマ
（`src/styles/room.css`。色は涼葉の浴衣の水色・白・帯の紺）。枠は `src/layouts/Room.astro`。

| ページ | 中身 |
|---|---|
| `/suzuha/` | 部屋のトップ。丸窓の絵・あいさつ・新しい記事・新しく飾った絵 |
| `/suzuha/profile/` | プロフィール（設定書にあることだけ。`src/data/suzuha.ts`） |
| `/suzuha/gallery/` と `/suzuha/gallery/<id>/` | ギャラリー。1 枚ずつ涼葉の一言と「AI で作った絵です」を出す |
| `/suzuha/articles/` と `/suzuha/articles/<slug>/` | 記事 |

- 部屋のどのページにも、SULab のトップへのリンクと、涼葉の X への入口を置く。X の入口は
  `src/data/suzuha.ts` の `xHandle` が空のあいだは出さない
- ページの端の小さな丸窓には、ギャラリーの絵をページごとに 1 枚選んで飾る（絵が無ければ出さない）
- 絵が 1 枚も無いあいだは、トップの丸窓は「絵を飾る場所」として空けておく
- 文字は丸ゴシック（部屋）と明朝（涼葉の言葉）。Web フォントは読み込まない

#### 記事を追加する

`src/content/articles/<slug>.md` を置くだけで、一覧（`/suzuha/articles`）と個別ページ（`/suzuha/articles/<slug>`）が増える。
ファイル名（拡張子なし）がそのまま URL になる（英小文字・数字・ハイフン）。

```md
---
title: 記事のタイトル
description: 一覧と OGP に出す短い説明（1〜2文）
date: 2026-10-09
---

本文（Markdown）
```

- 書き手は涼葉（`src/data/authors.ts`）。個別ページに涼葉の紹介（AI であること）を出す
- 全記事に「この記事は SULab の AI・涼葉が下書きし、運営者が手直ししています。」を**ページ側で必ず出す**
  （`ARTICLE_DISCLOSURE`。本文には書かない）
- 普段は sns-marketing の確認画面の「承認してサイトに反映」が記事を書き込み、手元でコミットする（push はしない）。
  公開は `main` に push したとき（下の「公開」）

#### 絵を飾る

`src/content/gallery/<id>.json` と `public/suzuha/gallery/<id>.webp`・`<id>-thumb.webp` の組で 1 枚。

```json
{ "date": "2026-10-10", "comment": "涼葉の一言", "alt": "絵の説明",
  "image": "/suzuha/gallery/<id>.webp", "thumb": "/suzuha/gallery/<id>-thumb.webp",
  "width": 1200, "height": 1600 }
```

普段は sns-marketing の確認画面の「ギャラリー」で承認すると、画像の中の情報（生成のプロンプト・設定・撮影や作成の情報）を
すべて消して Web 用（webp）に変換し、ここに書き込んで手元でコミットする（push はしない）。**手で置くときも、画像の情報を消してから置く。**

### 将来 Games を足すとき

`kind: 'game'` を付けたアプリは `releasedApps()`（= `kind: 'app'` のみ）から外れるので、
`apps.ts` に `releasedGames()` を足して Games セクションを作れば、All Apps を壊さずに
分類を増やせる。今は全件 `kind` 未指定＝`'app'` 扱い。

### Featured Apps を入れ替える

`src/data/apps.ts` 末尾の `featuredApps` の並びがそのまま表示順になる。

```ts
export const featuredApps = ['data-jong', 'my-meshi', 'lexlinka'];
```

入れ替えたら `npm run assets` を実行すると OGP 画像のアイコンも追従する。

### App Store のリンクを設定する

該当アプリの `appStoreUrl` に実際の URL を入れる。空文字のあいだは App Store ボタンが
出ず、詳細ページに「準備中です」と表示される。

### X アカウント・問い合わせ先を設定する

`src/data/site.ts` の `xHandle`（@ なし）と `contactEmail` を埋める。空のあいだは
ヘッダー・フッター・X セクションのリンクが自動的に非表示になる。

### アイコン・スクリーンショット

- アイコン: `public/apps/<slug>.png`（256×256 に縮小済み）
- スクリーンショット: `public/apps/<slug>/01.webp`〜。現在の画像は各アプリの
  App Store 掲載スクリーンショット（最大4枚・幅600pxのWebP）を取り込んだもの。
  差し替えるときは同じパスに置き、`screenshots` の `{ src, alt }` を合わせる。
  トップの Featured カードは先頭3枚、詳細ページのヒーローは1枚目、
  Screenshots セクションは全枚数を表示する。未設定なら
  アイコンを使ったプレースホルダーになる。

## ブランドアイコン

`brand/avatar-master.png`（X アカウントと同じ正方形トリミング）がマスター。
差し替えて `npm run assets` を実行すると、以下がまとめて再生成される。

- `public/og.jpg` … OGP画像（右側に円形アイコン）
- `public/apple-touch-icon.png` / `public/favicon.png`
- `public/brand/avatar.webp` … ヘッダーと X セクションで使う軽量版

マスターは `public/` の外に置いてあるので、重い元画像は公開されない。

## テーマ（ライト / ダーク）

**ダークテーマを正式採用**。配色は `src/styles/theme-dark.css` と
`src/styles/theme-light.css` にトークンとして分けてあり、切り替えは
`src/styles/global.css` の先頭1行だけ。

```css
@import './theme-dark.css';  /* ライトを試すなら './theme-light.css' */
```

ライトに切り替える場合は `src/layouts/Base.astro` の `theme-color`（`#0a0b0e`）も
`#ffffff` に変える。個別の色はコンポーネントに直接書かず、必ずテーマ側のトークン
（`--surface` / `--line` / `--text-muted` / `--tint-strong` など）を使うこと。
アプリごとのアクセント（`--app-accent`）から派生する色も `--accent-text` などの
トークン経由なので、テーマを変えても明るさが自動で合う。

## アクセス計測（自分の閲覧は必ず除外する）

`src/layouts/Base.astro` 末尾のスクリプトが、ページ閲覧・クリックを Cloudflare Worker
（`sudev-site-analytics`、管制室の「HP閲覧数」に表示）へ送っている。

- **すーさんが普段使うブラウザでは、最初に1回だけ `?meonly=1` を付けて開けばよい。**
  例: `https://suaiillust-eng.github.io/sudev-site/?meonly=1`
  一度開くとそのブラウザに `localStorage: su-owner=1` が付き、以降そのブラウザからの
  アクセスは（パラメータなしでも）自動で計測対象から外れ続ける。ブラウザ・端末を
  変えた場合や、サイトデータを消した場合は、その環境でもう一度だけ開き直す。
- **Claude（Claude in Chrome でのブラウザ操作）はこの限りではない。** セッションご
  とに新しいプロファイルで始まりフラグが引き継がれないため、Claude が本番HPを開い
  て確認する作業をするときは毎回 `?meonly=1` を付け直すこと（Claude自身への注意）。
- **ローカル（`npm run dev` / `npm run preview`）は計測されない**（`localhost` /
  `127.0.0.1` はスクリプト側で自動除外済み）。
- 計測データをリセットしたい場合は `~/sudev-site-analytics` の KV（namespace id
  `e805451691844e119ddd13f3fa5f16d0`）から `pv:*` / `siteday:*` / `sitetotal` の
  キーを削除する（`req:*` は「ご要望」データなので消さないこと）。管制室側の
  `stats/hp` ドキュメントも合わせて更新が必要。

## ご要望（要望フォーム）の受信

HP の要望フォームと、アプリ内の要望フォーム（旅跡など）は、どちらも `sudev-site-analytics` の
`POST /request` に `{ app, message }` を送る。受信した要望は KV の `req:*` に入る。

- 一覧 `GET /requests` と削除 `DELETE /requests/<id>` は **`?token=<SYNC_TOKEN>` が必須**
  （2026-09-24 から。誰でも読めて消せる状態だったため）。管制室の「ご要望」へ同期する
  ときもこのトークンを付けること。

## 公開（GitHub Pages）

1. GitHub に新しいリポジトリを作り、この中身を push する
2. リポジトリの Settings → Pages → Source を **GitHub Actions** にする
3. `main` に push すると `.github/workflows/deploy.yml` がビルドして公開する

`https://<user>.github.io/<repo>/` のようなプロジェクトページでも、ワークフローが
`BASE_PATH` を渡すのでリンク・画像のパスは自動で合う。独自ドメインを使う場合は
`src/data/site.ts` の `url` と `astro.config.mjs` の `site` をそのドメインに変更する。

## 構成

```
src/
  data/apps.ts      アプリ情報（ここだけ触れば増減できる）
  data/site.ts      サイト名・X・問い合わせ先
  pages/index.astro トップページ
  pages/apps/[slug].astro  アプリ詳細ページ（自動生成）
  pages/articles/          記事の一覧と個別ページ（content/articles/*.md から自動生成）
  content/articles/        記事の Markdown
  content.config.ts        記事の frontmatter の形
  data/authors.ts          記事の書き手（涼葉）と全記事に出す一文
  pages/contact.astro, privacy.astro, 404.astro
  components/       Header / Footer / FeaturedApp / AppCard / AppVisual / AppStoreButton
scripts/generate-assets.mjs  OGP・favicon 生成
```
