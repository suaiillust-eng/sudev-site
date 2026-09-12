/**
 * アプリ情報はこのファイルだけを編集すれば増減できる。
 * - Featured Apps を入れ替えるときは下の featuredApps を書き換える
 * - App Store URL が決まったら appStoreUrl に入れる（空ならボタンは表示されない）
 * - スクリーンショットは public/apps/<slug>/ に置き、screenshots に追記する
 *
 * 紹介文は App Store の掲載内容（2026-09-12 時点）に合わせてある。
 * ストア側を更新したら、こちらの summary / description / features も見直すこと。
 */

export type AppStatus = 'released' | 'development';

/** 作品の種類。将来ゲームが増えたら 'game' を付けて Games セクションに振り分ける。 */
export type AppKind = 'app' | 'game';

export type Screenshot = {
  /** public/ 以下のパス（例: '/apps/data-jong/01.png'） */
  src: string;
  alt: string;
};

export type App = {
  slug: string;
  /** サイト上で使う正式名称 */
  name: string;
  /** 'app'（既定）か 'game'。今は全件 'app' */
  kind?: AppKind;
  /** 名前の下に置く一行キャッチ */
  tagline: string;
  /** 一覧カード用の短い概要（1〜2文） */
  summary: string;
  /** 詳細ページ用の概要（数文） */
  description: string;
  features: { title: string; body: string }[];
  status: AppStatus;
  /** 開発中アプリの進捗メモ（status: 'development' のときだけ表示） */
  progress?: string;
  /**
   * 募集・告知の一行。カードと詳細ページにバッジとして出る。
   * 例: 'Android テスター募集中'。不要になったら消すだけでよい。
   */
  notice?: string;
  /** アイコン画像（public/ 以下のパス）。空なら頭文字のタイルを表示する */
  icon: string;
  /** カードやボタンのアクセントカラー */
  accent: string;
  /** App Store URL。未公開・未確定なら空文字 */
  appStoreUrl: string;
  screenshots: Screenshot[];
  platforms: string[];
};

export const apps: App[] = [
  {
    slug: 'data-jong',
    name: 'データ雀',
    tagline: '麻雀の卓上点棒管理・データ管理アプリ',
    summary:
      '対局中はスマホが点棒代わり。点差を見ながら打てて、終わった半荘はそのまま成績として蓄積される麻雀アプリ。順位率や和了率・放銃率まで振り返れる。',
    description:
      'データ雀は、卓上の点棒管理から成績の記録・集計までをひとつにまとめた麻雀サポートアプリです。点棒表示のない全自動卓でも点差を確認しながら打て、対局が終われば成績が自動で蓄積されます。雀荘やセット麻雀などアプリの外で打った対局もまとめて記録でき、順位率・平均着順から直近の調子までグラフで振り返れます。',
    features: [
      {
        title: '点棒機能',
        body: '全自動卓のお供に。和了・放銃・流局の処理を計算し、点差がひと目で分かります。サイコロ機能も内蔵。',
      },
      {
        title: '対局記録・スコア管理',
        body: '半荘ごとの結果を記録。半荘終了の自動確認で記録漏れを防ぎます。',
      },
      {
        title: '詳細データ集計',
        body: '順位率・平均着順・立直率・和了率・副露率・放銃率・席別平均順位など、さまざまな指標をグラフで確認できます。',
      },
      {
        title: '外部対局の記録',
        body: '雀荘やセット麻雀など、アプリ外で打った成績も1戦ずつ／1日まとめの2方式で記録・集計できます。',
      },
      {
        title: '三人麻雀・チップ対応',
        body: '三麻やチップのやり取りにも対応。いつものルールに合わせて使えます。',
      },
    ],
    notice: 'Android テスター募集中',
    status: 'released',
    icon: '/apps/data-jong.png',
    accent: '#25C07A',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E9%BA%BB%E9%9B%80%E7%82%B9%E6%95%B0%E8%A8%98%E9%8C%B2-%E5%88%86%E6%9E%90-%E3%83%87%E3%83%BC%E3%82%BF%E9%9B%80/id6762990641',
    screenshots: [
      { src: '/apps/data-jong/01.webp', alt: 'データ雀の画面1' },
      { src: '/apps/data-jong/02.webp', alt: 'データ雀の画面2' },
      { src: '/apps/data-jong/03.webp', alt: 'データ雀の画面3' },
      { src: '/apps/data-jong/04.webp', alt: 'データ雀の画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'my-meshi',
    name: 'マイめし',
    tagline: '自分だけの外食レビューを地図に残す',
    summary:
      '行ったお店を地図にピンで立て、写真・メモ・自分の評価を残すグルメ記録アプリ。他人のレビューは扱わない、自分専用の評価アーカイブ。',
    description:
      'マイめしは、自分のためだけのグルメ記録アプリです。行ったお店を地図にピンで立て、料理の写真・メモ・自分の評価を残していきます。他人のレビューは扱わず、自分が食べて感じた評価だけを貯めていく「店の評価アーカイブ」として使えます。',
    features: [
      {
        title: '地図にピンでお店を記録',
        body: '行ったお店を地図上にピンで登録。写真・メモ・評価・タグをまとめて残せます。',
      },
      {
        title: '自分の評価をつける',
        body: '星5評価が基本で、設定で10段階にも切り替え可能。小数第一位まで細かくつけられ、未評価のまま先に写真とメモだけ残すこともできます。',
      },
      {
        title: 'タグで自由に整理',
        body: '「ラーメン」「深夜」「一人で入れる」など自由にタグを作成。入力時のサジェストで過去のタグを再利用できます。',
      },
      {
        title: '並び替えで見返す',
        body: '高評価順・近い順・時系列順で並び替え。今いる場所の近くで評価の高いお店を探す、といった使い方ができます。',
      },
    ],
    status: 'released',
    icon: '/apps/my-meshi.png',
    accent: '#F2803A',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E8%87%AA%E5%88%86%E3%81%A0%E3%81%91%E3%81%AE%E5%A4%96%E9%A3%9F%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC-%E3%83%9E%E3%82%A4%E3%82%81%E3%81%97/id6780719053',
    screenshots: [
      { src: '/apps/my-meshi/01.webp', alt: 'マイめしの画面1' },
      { src: '/apps/my-meshi/02.webp', alt: 'マイめしの画面2' },
      { src: '/apps/my-meshi/03.webp', alt: 'マイめしの画面3' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'lexlinka',
    name: 'LexLinka',
    tagline: '接頭辞・接尾辞・語源から覚える英単語アプリ',
    summary:
      '英単語を部品に分解して、意味のつながりで覚える学習アプリ。英単語2,278語・接頭辞61・接尾辞50・語源64を収録。',
    description:
      'LexLinka は、接頭辞・接尾辞・語源から英単語を理解して覚える学習アプリです。丸暗記ではなく、単語を part（部品）に分解し、意味のつながりで覚えていきます。1日1個ずつ接頭辞・接尾辞をじっくり学び、単語から語源、派生語へとタップでたどれるので、覚えた知識が次の単語につながります。',
    features: [
      {
        title: '1日1個ずつ学ぶ',
        body: '接頭辞と接尾辞を1日1個ずつ、じっくり学習していきます。',
      },
      {
        title: '復習モード',
        body: '学んだ項目を復習モードで確認し、定着をチェックできます。',
      },
      {
        title: '知識のリンク',
        body: '単語 → 語源 → 派生語と、タップでたどれる構造。つながりから覚えられます。',
      },
      {
        title: '2,278語を収録',
        body: '英単語2,278語・接頭辞61・接尾辞50・語源64を収録。難易度フィルターとお気に入りで、必要な語だけ引き直せます。',
      },
    ],
    status: 'released',
    icon: '/apps/lexlinka.png',
    accent: '#7C83FF',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E6%8E%A5%E9%A0%AD%E8%BE%9E-%E6%8E%A5%E5%B0%BE%E8%BE%9E%E3%81%8B%E3%82%89%E8%A6%9A%E3%81%88%E3%82%8B%E8%8B%B1%E5%8D%98%E8%AA%9E-lexlinka/id6792431101',
    screenshots: [
      { src: '/apps/lexlinka/01.webp', alt: 'LexLinkaの画面1' },
      { src: '/apps/lexlinka/02.webp', alt: 'LexLinkaの画面2' },
      { src: '/apps/lexlinka/03.webp', alt: 'LexLinkaの画面3' },
      { src: '/apps/lexlinka/04.webp', alt: 'LexLinkaの画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'bodolink',
    name: 'ボドリンク',
    tagline: 'ボードゲーム会・サークルの管理アプリ',
    summary:
      '「今日、何遊ぶ？」を10秒で。候補日をタップするだけの日程調整と、集まったメンバーの所持ゲームからの絞り込みができるボードゲーム会の管理アプリ。',
    description:
      'ボドリンク（BodoLink）は、ボードゲーム会やサークルのための管理アプリです。カレンダーに候補日を置けば、メンバーは参加できる日をタップするだけ。開催が決まったら、集まったメンバーの所持ゲームから「今日遊べるゲーム」を絞り込めます。ソロで使う機能はサインインなし・端末内保存で動きます。',
    features: [
      {
        title: '日程調整はタップするだけ',
        body: '候補日をタップして参加表明。開催日を確定すると、場所・メモ・コメント（写真も可）で当日の連絡までまとめられます。',
      },
      {
        title: '今日遊べるゲーム',
        body: 'メンバーの所持ゲームから、集まった人数やプレイ時間で絞り込み。プレイ記録を残して振り返ることもできます。',
      },
      {
        title: 'プリセット103タイトル',
        body: '人数・プレイ時間・タグを整理した103タイトルを収録。手入力にも対応しています。',
      },
      {
        title: 'ソロでも使える',
        body: 'サインインなしでゲーム管理とプレイ履歴を利用できます（データは端末内のみに保存）。',
      },
    ],
    notice: 'Android テスター募集中',
    status: 'released',
    icon: '/apps/bodolink.png',
    accent: '#D8A343',
    appStoreUrl:
      'https://apps.apple.com/jp/app/bodolink-%E3%83%9C%E3%83%BC%E3%83%89%E3%82%B2%E3%83%BC%E3%83%A0%E4%BC%9A-%E3%82%B5%E3%83%BC%E3%82%AF%E3%83%AB%E7%AE%A1%E7%90%86/id6788946253',
    screenshots: [
      { src: '/apps/bodolink/01.webp', alt: 'ボドリンクの画面1' },
      { src: '/apps/bodolink/02.webp', alt: 'ボドリンクの画面2' },
      { src: '/apps/bodolink/03.webp', alt: 'ボドリンクの画面3' },
      { src: '/apps/bodolink/04.webp', alt: 'ボドリンクの画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'tabiato',
    name: '旅跡',
    tagline: '訪れた場所に写真とメモを残す、自分だけの旅の地図',
    summary:
      '地図にピンを立てて、写真・メモ・訪問日を記録する旅の記録アプリ。行きたい場所のストックや、世界遺産・国立公園のコレクションもできる。',
    description:
      '旅跡（タビアト）は、訪れた場所に写真とメモを残して、自分だけの旅の地図を育てていくアプリです。写真フォルダの中でバラバラになりがちな旅の記録を、地図の上にまとめていきます。行った場所が増えるほど、地図はあなただけのものになっていきます。',
    features: [
      {
        title: 'ピンを立てて残す',
        body: '地図をタップしてピンを立て、写真・メモ・訪問日を記録。見返すたびにその場所の記憶がよみがえります。',
      },
      {
        title: '時系列でふり返る',
        body: '記録した場所を時系列で並べて、これまでの旅の足あとをたどれます。',
      },
      {
        title: '行きたいピン',
        body: 'まだ訪れていない場所は「行きたいピン」として登録。次の旅の計画に使えます。',
      },
      {
        title: 'コレクション',
        body: '日本の世界遺産や国立公園など、テーマごとのスポットを巡って制覇を目指せます。訪れた場所は地図にも記録され、達成度がひと目で分かります。',
      },
    ],
    status: 'released',
    icon: '/apps/tabiato.png',
    accent: '#5AA0D6',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E6%97%85%E8%B7%A1-%E3%82%BF%E3%83%93%E3%82%A2%E3%83%88/id6779035442',
    screenshots: [
      { src: '/apps/tabiato/01.webp', alt: '旅跡の画面1' },
      { src: '/apps/tabiato/02.webp', alt: '旅跡の画面2' },
      { src: '/apps/tabiato/03.webp', alt: '旅跡の画面3' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'combo-keisan',
    name: 'コンボ計算',
    tagline: 'コンボ理論で放銃率を計算する麻雀アプリ',
    summary:
      '手牌と各家の河を入力すると、見えていない牌の組み合わせから牌ごとの放銃率の目安を計算。押し引きやベタオリの検討に使える。',
    description:
      'コンボ計算は、麻雀の「コンボ理論」で放銃率を計算するアプリです。手牌と各家の河を入力すると、見えていない牌の組み合わせ（コンボ数）から、牌ごとの放銃率の目安を算出します。ネット麻雀や実戦の局面を再現して、押し引きやベタオリの検討に使えます。',
    features: [
      {
        title: '牌譜入力',
        body: '自分の手牌／自分・下家・対面・上家の河／その他の6枠で局面を再現できます。',
      },
      {
        title: '放銃率の表示',
        body: '全体と相手別の放銃率を表示。相手別ではフリテンを自動で考慮します。',
      },
      {
        title: '安全マーク',
        body: '牌を長押しすると、その相手に対する安全牌として扱えます。',
      },
      {
        title: 'コンボ数と待ちの内訳',
        body: '1牌ごとのコンボ数と待ち形の内訳を確認でき、待ち種別ごとの重み付けも設定できます。三人麻雀モードにも対応。',
      },
    ],
    status: 'released',
    icon: '/apps/combo-keisan.png',
    accent: '#3FAE72',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E3%82%B3%E3%83%B3%E3%83%9C%E8%A8%88%E7%AE%97/id6790713496',
    screenshots: [
      { src: '/apps/combo-keisan/01.webp', alt: 'コンボ計算の画面1' },
      { src: '/apps/combo-keisan/02.webp', alt: 'コンボ計算の画面2' },
      { src: '/apps/combo-keisan/03.webp', alt: 'コンボ計算の画面3' },
      { src: '/apps/combo-keisan/04.webp', alt: 'コンボ計算の画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'setting-tool',
    name: '設定判別ツール My Brain',
    tagline: 'ベイズ推定で設定を推測する補助ツール',
    summary:
      '機種ごとに理論値を登録し、実戦のゲーム数やカウントを入力すると、ベイズ推定で設定1〜6の可能性を数値で確認できるパチスロの補助ツール。',
    description:
      '設定判別ツール My Brain は、パチスロの設定推測を補助するツールです。機種ごとに小役確率などの理論値を自分で登録し、実戦で得たゲーム数や各カウントを入力すると、ベイズ推定にもとづいて設定1〜6の可能性を数値で確認できます。理論値は自由に登録・編集できるので、好きな機種に合わせて使えます。',
    features: [
      {
        title: '機種ごとに理論値を登録',
        body: '小役確率などの解析値を自分で登録・編集でき、機種に合わせて使えます。',
      },
      {
        title: 'ベイズ推定で設定推測',
        body: '入力したカウントから、設定1〜6の可能性を確率として表示します。',
      },
      {
        title: 'カウンター機能',
        body: '実戦中の入力をすばやく行えるカウンター。縦画面・横画面のどちらにも対応しています。',
      },
      {
        title: '柔軟な項目設定',
        body: '総回転数を母数にした項目や、欠番設定にも対応。データはすべて端末内に保存され、アカウント登録は不要です。',
      },
    ],
    status: 'released',
    icon: '/apps/setting-tool.png',
    accent: '#8C7CFF',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E8%A8%AD%E5%AE%9A%E5%88%A4%E5%88%A5%E3%83%84%E3%83%BC%E3%83%AB-my-brain/id6782522020',
    screenshots: [
      { src: '/apps/setting-tool/01.webp', alt: '設定判別ツール My Brainの画面1' },
      { src: '/apps/setting-tool/02.webp', alt: '設定判別ツール My Brainの画面2' },
      { src: '/apps/setting-tool/03.webp', alt: '設定判別ツール My Brainの画面3' },
      { src: '/apps/setting-tool/04.webp', alt: '設定判別ツール My Brainの画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'takken',
    name: '卓見',
    tagline: '鳴き読み・山読み・手牌読みを鍛える麻雀アプリ',
    summary:
      '4人全員の捨て牌を手出し・ツモ切りの区別まで記録し、どの牌が何枚残っているかを可視化。読みの練習に使える横画面専用アプリ。',
    description:
      '卓見は、麻雀の「読み」を練習するためのアプリです。4人全員の捨て牌を手出し・ツモ切りの区別まで記録でき、場に切られた牌を合算して、どの牌が何枚残っているかをひと目で確認できます。残り牌の可視化を手がかりに、鳴き読み・山読み・手牌読みを自分のペースで練習できます。横画面専用で、ネット麻雀のリプレイを見ながら一局を復習する使い方に向いています。',
    features: [
      {
        title: '捨て牌の記録と残り枚数表示',
        body: '手出し／ツモ切り、リーチ、鳴き、ドラ表示牌に対応。場に見えている牌から残り枚数を集計します。',
      },
      {
        title: '手牌構成表と山の残り表',
        body: '人ごとの手牌構成表と山の残り表を、濃淡で「持っていそう／山にありそう」として整理できます。',
      },
      {
        title: '読みの知識帳',
        body: '気づいたセオリーをカテゴリ別にメモして、繰り返し参照できます。',
      },
      {
        title: '対局の保存と再生',
        body: '実際の手牌を保存し、後日あらためて読み直して答え合わせができます。',
      },
    ],
    status: 'released',
    icon: '/apps/takken.png',
    accent: '#2E9B63',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E9%B3%B4%E3%81%8D%E8%AA%AD%E3%81%BF-%E5%B1%B1%E8%AA%AD%E3%81%BF-%E6%89%8B%E7%89%8C%E8%AA%AD%E3%81%BF-%E5%8D%93%E8%A6%8B/id6778256304',
    screenshots: [
      { src: '/apps/takken/01.webp', alt: '卓見の画面1' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'mahjong-league',
    name: '雀リーグ',
    tagline: '仲間内のリーグ戦のスコア記録・集計',
    summary:
      '半荘ごとの点数を入力するだけで、シーズン成績・対戦成績・個人成績を自動集計。グループを共有すればメンバー全員で同じ記録を扱える。',
    description:
      '雀リーグは、仲間内の定例麻雀やサークルのリーグ戦のための、シンプルなスコア記録・集計アプリです。半荘ごとの点数を入力していくだけで面倒な集計を自動で行い、誰が強いか、相性はどうか、成績の推移までひと目で把握できます。集計係が一人で抱える必要はありません。',
    features: [
      {
        title: '半荘スコアの記録',
        body: '対局ごとに各プレイヤーの点数を入力。継続して記録し、リーグ戦のスコアを積み上げられます。',
      },
      {
        title: '3つの視点で自動集計',
        body: 'シーズン成績・対戦成績・個人成績を自動集計。成績の推移もグラフで確認できます。',
      },
      {
        title: 'グループ共有',
        body: 'グループを共有すれば、メンバー全員で同じ記録を同期して閲覧・入力できます。',
      },
      {
        title: '自分好みにカスタマイズ',
        body: '記録したい項目を追加でき、リーグのルールに合わせた運用ができます。',
      },
    ],
    status: 'released',
    icon: '/apps/mahjong-league.png',
    accent: '#C8973F',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E9%9B%80%E3%83%AA%E3%83%BC%E3%82%B0/id6807704653',
    screenshots: [
      { src: '/apps/mahjong-league/01.webp', alt: '雀リーグの画面1' },
      { src: '/apps/mahjong-league/02.webp', alt: '雀リーグの画面2' },
      { src: '/apps/mahjong-league/03.webp', alt: '雀リーグの画面3' },
      { src: '/apps/mahjong-league/04.webp', alt: '雀リーグの画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'uchinokozukan',
    name: 'うちの子図鑑',
    tagline: 'ペットと子供の写真をまとめて残すアルバム',
    summary:
      '「うちの子」ごとに写真と記録をまとめるアルバムアプリ。アカウント登録なし・広告なしで使えて、家族グループでの共有もできる。',
    description:
      'うちの子図鑑は、「うちの子」の毎日を記録できる写真アプリです。ペットも子供も、家族みんなの大切な「うちの子」として登録し、何気ない日々も特別な思い出もアルバムにまとめて残せます。アカウント登録なしで今日から使いはじめられ、広告のないシンプルな設計です。',
    features: [
      {
        title: '「うちの子」を登録',
        body: '犬・猫・その他のペット、そしてお子さんを登録。種類や品種、誕生日、迎えた日などを記録できます。',
      },
      {
        title: '写真にタグ付け',
        body: '1枚の写真に複数の「うちの子」をタグ付け。誰が写っているかがひと目で分かります。',
      },
      {
        title: '体重記録',
        body: 'ペットの体重を日付ごとに記録でき、健康管理にも活用できます。',
      },
      {
        title: '家族グループで共有',
        body: '招待コードで家族メンバーを追加し、グループ内で写真を共有・閲覧できます（有料プラン）。',
      },
      {
        title: 'チャイルドロック',
        body: '4桁のPINで保護。お子さんがスマホを触っても、誤って写真を消したり購入したりしない設計です。',
      },
    ],
    notice: 'Android テスター募集中',
    status: 'released',
    icon: '/apps/uchinokozukan.png',
    accent: '#F0A93F',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E3%81%86%E3%81%A1%E3%81%AE%E5%AD%90%E5%9B%B3%E9%91%91-%E3%83%9A%E3%83%83%E3%83%88%E3%81%A8%E5%AD%90%E4%BE%9B%E3%81%AE%E5%86%99%E7%9C%9F%E5%85%B1%E6%9C%89/id6769707172',
    screenshots: [
      { src: '/apps/uchinokozukan/01.webp', alt: 'うちの子図鑑の画面1' },
      { src: '/apps/uchinokozukan/02.webp', alt: 'うちの子図鑑の画面2' },
      { src: '/apps/uchinokozukan/03.webp', alt: 'うちの子図鑑の画面3' },
      { src: '/apps/uchinokozukan/04.webp', alt: 'うちの子図鑑の画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'cost-timeline',
    name: 'Cost Timeline',
    tagline: 'サブスクと固定費をまとめて見える化',
    summary:
      '家賃・光熱費・通信費から動画配信やAIサービスまで、毎月の決まった支出をひとつの画面で把握。支払日の通知や将来シミュレーションもできる。',
    description:
      'Cost Timeline（コストタイムライン）は、毎月の固定費やサブスクリプションをまとめて管理できる家計サポートアプリです。家賃・光熱費・通信費から動画配信・音楽・AIサービスまで、毎月の「決まった支出」をひとつの画面で見える化し、ムダな支出の削減に役立てられます。',
    features: [
      {
        title: '固定費・サブスクの登録',
        body: 'カテゴリ別に一覧表示。人気サービスのプリセットからワンタップで登録できます。',
      },
      {
        title: 'カレンダーで支払日を把握',
        body: 'いつ何の支払いがあるかをカレンダーでひと目で確認できます。',
      },
      {
        title: '月間・年間の自動集計',
        body: '合計を自動計算し、カテゴリ別の内訳も表示します。',
      },
      {
        title: '支払日前のお知らせ',
        body: '何日前の何時に通知するかを自由に設定できます。',
      },
      {
        title: '将来シミュレーション',
        body: 'このまま払い続けるといくらになるかを試算できます。',
      },
    ],
    status: 'released',
    icon: '/apps/cost-timeline.png',
    accent: '#6878C8',
    appStoreUrl:
      'https://apps.apple.com/jp/app/%E3%82%B5%E3%83%96%E3%82%B9%E3%82%AF%E7%AE%A1%E7%90%86-%E5%9B%BA%E5%AE%9A%E8%B2%BB%E7%AE%A1%E7%90%86-cost-timeline/id6785171813',
    screenshots: [
      { src: '/apps/cost-timeline/01.webp', alt: 'Cost Timelineの画面1' },
      { src: '/apps/cost-timeline/02.webp', alt: 'Cost Timelineの画面2' },
      { src: '/apps/cost-timeline/03.webp', alt: 'Cost Timelineの画面3' },
      { src: '/apps/cost-timeline/04.webp', alt: 'Cost Timelineの画面4' },
    ],
    platforms: ['iOS'],
  },
  {
    slug: 'aillunote',
    name: 'AIlluNote',
    tagline: 'AIイラストのプロンプトを整理して使うアプリ',
    summary:
      'AIイラスト生成に使うプロンプトを管理するアプリ。カテゴリとタグで整理し、ワンタップでコピーして使える。ネガティブプロンプトもセットで残せる。',
    description:
      'AIlluNote は、AIイラスト生成に使うプロンプトをスマートに管理・活用するためのアプリです。思いついたプロンプトをカテゴリとタグで整理し、使うときはワンタップでコピー。ネガティブプロンプトも一緒に管理できるので、いつもの組み合わせをそのまま呼び出せます。',
    features: [
      {
        title: 'カテゴリ・タグで整理',
        body: 'プロンプトをカテゴリとタグで分類して、増えても散らからないように管理できます。',
      },
      {
        title: 'ワンタップでコピー',
        body: '使いたいプロンプトをタップひとつでコピーして、そのまま生成ツールに貼り付けられます。',
      },
      {
        title: 'ネガティブプロンプトも一緒に',
        body: 'ネガティブプロンプトをセットで管理できるので、いつもの組み合わせを崩さず使えます。',
      },
      {
        title: 'お気に入りと検索',
        body: 'よく使うものはお気に入り登録。検索とタグフィルターで目的のプロンプトをすぐ見つけられます。',
      },
    ],
    status: 'released',
    icon: '/apps/aillunote.png',
    accent: '#9B5CF6',
    appStoreUrl: 'https://apps.apple.com/jp/app/aillunote/id6768489583',
    screenshots: [
      { src: '/apps/aillunote/01.webp', alt: 'AIlluNoteの画面1' },
      { src: '/apps/aillunote/02.webp', alt: 'AIlluNoteの画面2' },
      { src: '/apps/aillunote/03.webp', alt: 'AIlluNoteの画面3' },
      { src: '/apps/aillunote/04.webp', alt: 'AIlluNoteの画面4' },
    ],
    platforms: ['iOS', 'iPadOS'],
  },
];

/** トップページで大きく紹介するアプリ。並び順がそのまま表示順になる。 */
export const featuredApps = ['data-jong', 'my-meshi', 'lexlinka'];

export const appBySlug = (slug: string) => apps.find((a) => a.slug === slug);

export const featured = () =>
  featuredApps.map((slug) => appBySlug(slug)).filter((a): a is App => Boolean(a));

/** 公開済みアプリ（kind: 'app'）。将来 'game' を足したら Games 側で分ければよい */
export const releasedApps = () =>
  apps.filter((a) => a.status === 'released' && (a.kind ?? 'app') === 'app');

/** Featured 以外の公開済みアプリ */
export const otherReleased = () =>
  releasedApps().filter((a) => !featuredApps.includes(a.slug));
