/**
 * トップページのお知らせ枠に表示する項目。
 * 新しい方が上（配列の先頭）に来るように追加していく。
 */
export interface Notice {
  date: string; // YYYY-MM-DD
  status: 'progress' | 'planned' | 'released';
  title: string;
  body?: string;
  /** src/data/apps.ts の slug。指定するとアプリアイコンを添えて表示する。 */
  appSlug?: string;
}

export const notices: Notice[] = [
  {
    date: '2026-09-23',
    status: 'planned',
    title: '旅跡に共有機能を追加予定',
    body: '訪れた場所の記録を、他の人と共有できるようにする機能を計画しています。',
    appSlug: 'tabiato',
  },
  {
    date: '2026-09-23',
    status: 'released',
    title: 'ブランド名を SULab に変更',
    body: 'アプリ開発に加えて、動画制作などAIを使った活動全般を行っていきます。',
  },
  {
    date: '2026-09-23',
    status: 'planned',
    title: 'AI動画コンテンツの制作を準備中',
    body: 'YouTube での発信を予定しています。詳細は追ってお知らせします。',
  },
];

export const statusLabel: Record<Notice['status'], string> = {
  progress: '進行中',
  planned: '予定',
  released: '公開済み',
};
