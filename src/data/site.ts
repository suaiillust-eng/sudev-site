/**
 * サイト全体の設定。
 * URL 未確定のものは空文字のままにしておくと、該当リンクは自動的に非表示になる。
 */
export const site = {
  name: 'SUdev',
  title: 'SUdev',
  description:
    'SUdev は個人開発のアプリブランドです。麻雀の点棒・データ管理「データ雀」、グルメ記録「マイめし」、英単語学習「LexLinka」をはじめ、公開中の12本のアプリを掲載しています。',
  /** 公開後の本番 URL（OGP の絶対 URL に使用）。astro.config.mjs の site と合わせる。 */
  url: 'https://suaiillust-eng.github.io',
  /** X アカウント。ハンドル名（@ なし）を入れるとサイト内のリンクが有効になる。 */
  xHandle: 'sudeverop',
  /** 問い合わせ用メールアドレス。空なら Contact ページはメール以外の導線のみ表示。 */
  contactEmail: 'su.aiillust@gmail.com',
} as const;

export const xUrl = site.xHandle ? `https://x.com/${site.xHandle}` : '';
