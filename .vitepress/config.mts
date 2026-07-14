import { defineConfig } from 'vitepress'

const repository = process.env.GITHUB_REPOSITORY
const [owner, repositoryName] = repository?.split('/') ?? []
const isUserSite = repositoryName === `${owner}.github.io`
const base =
  process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserSite
    ? `/${repositoryName}/`
    : '/'
const japaneseSegmenter = new Intl.Segmenter('ja', { granularity: 'word' })

function tokenizeJapanese(text: string) {
  return [...japaneseSegmenter.segment(text)]
    .filter((part) => part.isWordLike)
    .map((part) => part.segment.toLocaleLowerCase('ja'))
}

export default defineConfig({
  lang: 'ja-JP',
  title: 'REC Lab Okinawa',
  titleTemplate: ':title | REC Lab Okinawa',
  description: 'Cubase Pro 14とMOTU M2で学ぶ、録音・ミックス・マスタリングの12週間独学教材',
  base,
  srcExclude: ['README.md', '.github/**'],
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'ja_JP' }],
    ['meta', { property: 'og:title', content: 'REC Lab Okinawa' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Cubase Pro 14とMOTU M2で学ぶ、録音・ミックス・マスタリングの12週間独学教材'
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '進捗', link: '/progress' },
      { text: '12週間', link: '/ROADMAP' },
      {
        text: '理論',
        items: [
          { text: '01 オーディオ基礎', link: '/lessons/01-audio-foundations' },
          { text: '02 録音と編集', link: '/lessons/02-recording-editing' },
          { text: '03 ミキシング', link: '/lessons/03-mixing' },
          { text: '04 マスタリング', link: '/lessons/04-mastering-delivery' },
          { text: '05 資格と仕事', link: '/lessons/05-exam-career' }
        ]
      },
      { text: 'Cubase実習', link: '/practice/cubase-labs' },
      { text: '模試', link: '/practice/mock-exam' }
    ],
    sidebar: [
      {
        text: 'スタート',
        items: [
          { text: 'ホーム', link: '/' },
          { text: '学習ダッシュボード', link: '/progress' },
          { text: '12週間ロードマップ', link: '/ROADMAP' }
        ]
      },
      {
        text: '理論教材',
        collapsed: false,
        items: [
          { text: '01 オーディオ基礎', link: '/lessons/01-audio-foundations' },
          { text: '02 録音と編集', link: '/lessons/02-recording-editing' },
          { text: '03 ミキシング', link: '/lessons/03-mixing' },
          { text: '04 マスタリングと納品', link: '/lessons/04-mastering-delivery' },
          { text: '05 資格・権利・仕事', link: '/lessons/05-exam-career' }
        ]
      },
      {
        text: '実習と試験',
        collapsed: false,
        items: [
          { text: 'Cubase実習12本', link: '/practice/cubase-labs' },
          { text: 'バンド曲プロジェクト', link: '/practice/band-project' },
          { text: '1日10分の耳トレ', link: '/practice/listening-drills' },
          { text: '計算練習', link: '/practice/calculations' },
          { text: '計算練習の解答', link: '/practice/calculations-answers' },
          { text: '基礎模試40問', link: '/practice/mock-exam' },
          { text: '模試の解答・解説', link: '/practice/mock-exam-answers' }
        ]
      },
      {
        text: '記録テンプレート',
        collapsed: true,
        items: [
          { text: '学習ログ', link: '/templates/study-log' },
          { text: '録音チェック', link: '/templates/session-checklist' },
          { text: 'ミックスノート', link: '/templates/mix-notes' },
          { text: 'マスタリングQC', link: '/templates/mastering-qc' },
          { text: '作品集ケーススタディ', link: '/templates/portfolio-case-study' }
        ]
      },
      {
        text: '補助資料',
        collapsed: true,
        items: [
          { text: '公式資料・沖縄の候補', link: '/resources/references' },
          { text: 'ChatGPTプロンプト集', link: '/PROMPTS' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: tokenizeJapanese
          }
        },
        translations: {
          button: {
            buttonText: '教材を検索',
            buttonAriaLabel: '教材を検索'
          },
          modal: {
            noResultsText: '見つかりませんでした',
            resetButtonTitle: '検索をクリア',
            footer: {
              selectText: '選択',
              navigateText: '移動',
              closeText: '閉じる'
            }
          }
        }
      }
    },
    outline: { label: 'このページの内容', level: [2, 3] },
    docFooter: { prev: '前へ', next: '次へ' },
    lastUpdated: {
      text: '最終更新',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' }
    },
    sidebarMenuLabel: '教材メニュー',
    returnToTopLabel: 'ページ上部へ戻る',
    darkModeSwitchLabel: '表示テーマ',
    lightModeSwitchTitle: 'ライトモードに切り替える',
    darkModeSwitchTitle: 'ダークモードに切り替える',
    notFound: {
      title: 'ページが見つかりません',
      quote: 'URLを確認するか、ホームから教材を選び直してください。',
      linkLabel: 'ホームへ戻る',
      linkText: 'ホームへ戻る'
    }
  }
})
