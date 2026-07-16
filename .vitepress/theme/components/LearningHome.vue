<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

type LearningGoal = 'band' | 'japrs' | 'both'

type StoredWeek = {
  id?: number
  checks?: unknown[]
}

type StoredProgress = {
  updatedAt?: string
  weeks?: StoredWeek[]
}

type LastLearning = {
  href: string
  title: string
  updatedAt: string
}

type TrackMeta = {
  id: number
  title: string
  href: string
}

type TrackSummary = {
  id: 'band' | 'japrs'
  name: string
  shortName: string
  percent: number
  completed: number
  total: number
  completedWeeks: number
  totalWeeks: number
  nextTitle: string
  nextHref: string
  updatedAt: string
  detailHref: string
}

const GOAL_KEY = 'rec-lab-learning-goal-v1'
const BAND_PROGRESS_KEY = 'rec-lab-okinawa-progress-v1'
const JAPRS_PROGRESS_KEY = 'rec-lab-japrs-progress-v1'
const GUIDE_KEY = 'rec-lab-japrs-beginner-guide-v1'
const LAST_LEARNING_KEY = 'rec-lab-last-learning-v1'

const goal = ref<LearningGoal | null>(null)
const ready = ref(false)
const changingGoal = ref(false)
const guideCompleted = ref(false)
const lastLearning = ref<LastLearning | null>(null)
const bandStored = ref<StoredProgress | null>(null)
const japrsStored = ref<StoredProgress | null>(null)

const bandTasks = ['理論を読む', 'Cubase実習を行う', '耳トレ・小テストを行う', '成果物と振り返りを残す']
const japrsTasks = ['教材を読む', '資料なしで説明・計算する', '問題と遅延復習を行う']

const bandWeeks: TrackMeta[] = [
  { id: 1, title: 'システムと信号経路', href: '/ROADMAP.html#week-1' },
  { id: 2, title: '音、周波数、dB', href: '/ROADMAP.html#week-2' },
  { id: 3, title: 'デジタル音声', href: '/ROADMAP.html#week-3' },
  { id: 4, title: '電気音響とマイク', href: '/ROADMAP.html#week-4' },
  { id: 5, title: '収音と演奏', href: '/ROADMAP.html#week-5' },
  { id: 6, title: '編集とセッション管理', href: '/ROADMAP.html#week-6' },
  { id: 7, title: 'スタティックミックス', href: '/ROADMAP.html#week-7' },
  { id: 8, title: 'EQ', href: '/ROADMAP.html#week-8' },
  { id: 9, title: 'ダイナミクス', href: '/ROADMAP.html#week-9' },
  { id: 10, title: '空間・ステレオ・自動化', href: '/ROADMAP.html#week-10' },
  { id: 11, title: 'マスタリングとQC', href: '/ROADMAP.html#week-11' },
  { id: 12, title: '試験・権利・作品集', href: '/ROADMAP.html#week-12' }
]

const japrsWeeks: TrackMeta[] = [
  { id: 1, title: '音の三要素と波', href: '/exam/01-acoustics-hearing.html#week-1-start' },
  { id: 2, title: '聴覚・心理音響・ステレオ', href: '/exam/01-acoustics-hearing.html#week-2-start' },
  { id: 3, title: 'dB・波長・位相・音律', href: '/exam/01-acoustics-hearing.html#week-3-start' },
  { id: 4, title: '直流・オームの法則・電力', href: '/exam/02-electricity-circuits.html#week-4-start' },
  { id: 5, title: '交流・回路・磁気', href: '/exam/02-electricity-circuits.html#week-5-start' },
  { id: 6, title: '配線・端子・バランス伝送', href: '/exam/03-studio-systems.html#week-6-start' },
  { id: 7, title: 'マイク・コンソール・モニター', href: '/exam/03-studio-systems.html#week-7-start' },
  { id: 8, title: 'テープ・デジタル・クロック', href: '/exam/03-studio-systems.html#week-8-start' },
  { id: 9, title: 'ステレオ収音とアンサンブル', href: '/exam/04-recording-advanced.html#week-9-start' },
  { id: 10, title: 'オーバーダブ・ミックス・ライブ', href: '/exam/04-recording-advanced.html#week-10-start' },
  { id: 11, title: '同期・サラウンド・立体音響', href: '/exam/04-recording-advanced.html#week-11-start' },
  { id: 12, title: '楽譜・テンポ・音程・楽語', href: '/exam/05-music-theory-instruments.html#week-12-start' },
  { id: 13, title: '楽器族・構造・音域', href: '/exam/05-music-theory-instruments.html#week-13-start' },
  { id: 14, title: '著作権・著作隣接権・権利処理', href: '/exam/06-copyright-history-staff.html#week-14-start' },
  { id: 15, title: '録音史・スタッフ・音響設計', href: '/exam/06-copyright-history-staff.html#week-15-start' },
  { id: 16, title: '100問模試と誤答の再学習', href: '/exam/mock-exam.html#week-16-start' }
]

function safeParse(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function isGoal(value: unknown): value is LearningGoal {
  return value === 'band' || value === 'japrs' || value === 'both'
}

function readGoal() {
  const stored = safeParse(GOAL_KEY) as { goal?: unknown } | string | null
  if (typeof stored === 'string' && isGoal(stored)) return stored
  return stored && typeof stored === 'object' && isGoal(stored.goal) ? stored.goal : null
}

function readProgress(key: string): StoredProgress | null {
  const stored = safeParse(key)
  if (!stored || typeof stored !== 'object') return null
  const progress = stored as StoredProgress
  return Array.isArray(progress.weeks) ? progress : null
}

function readGuideCompleted() {
  const stored = safeParse(GUIDE_KEY) as { completedAt?: unknown } | null
  return Boolean(stored && typeof stored.completedAt === 'string')
}

function isSafeLearning(value: unknown): value is LastLearning {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<LastLearning>
  return Boolean(
    typeof item.href === 'string' &&
    item.href.startsWith('/') &&
    !item.href.startsWith('//') &&
    typeof item.title === 'string' &&
    item.title.trim() &&
    typeof item.updatedAt === 'string'
  )
}

function refresh() {
  if (typeof window === 'undefined') return
  goal.value = readGoal()
  bandStored.value = readProgress(BAND_PROGRESS_KEY)
  japrsStored.value = readProgress(JAPRS_PROGRESS_KEY)
  guideCompleted.value = readGuideCompleted()
  const storedLearning = safeParse(LAST_LEARNING_KEY)
  lastLearning.value = isSafeLearning(storedLearning) ? storedLearning : null
}

function summarize(
  id: 'band' | 'japrs',
  stored: StoredProgress | null,
  weeks: TrackMeta[],
  tasks: string[],
  detailHref: string
): TrackSummary {
  const savedWeeks = new Map(
    (stored?.weeks ?? []).map((week) => [Number(week.id), Array.isArray(week.checks) ? week.checks : []])
  )
  let completed = 0
  let completedWeeks = 0
  let nextWeek: TrackMeta | undefined
  let nextTaskIndex = 0

  for (const week of weeks) {
    const checks = savedWeeks.get(week.id) ?? []
    const checkedCount = tasks.reduce((sum, _, index) => sum + (checks[index] === true ? 1 : 0), 0)
    completed += checkedCount
    if (checkedCount === tasks.length) completedWeeks += 1
    if (!nextWeek && checkedCount < tasks.length) {
      nextWeek = week
      const firstUnchecked = tasks.findIndex((_, index) => checks[index] !== true)
      nextTaskIndex = firstUnchecked < 0 ? 0 : firstUnchecked
    }
  }

  const total = weeks.length * tasks.length
  const finished = !nextWeek
  return {
    id,
    name: id === 'band' ? 'バンド制作・実務コース' : 'JAPRS試験コース',
    shortName: id === 'band' ? 'バンド制作' : 'JAPRS',
    percent: total ? Math.round(completed / total * 100) : 0,
    completed,
    total,
    completedWeeks,
    totalWeeks: weeks.length,
    nextTitle: finished
      ? (id === 'band' ? '12週間完走。次の1曲へ進む' : '16週間完走。誤答を再学習する')
      : `Week ${nextWeek.id}「${nextWeek.title}」：${tasks[nextTaskIndex]}`,
    nextHref: finished ? detailHref : nextWeek.href,
    updatedAt: typeof stored?.updatedAt === 'string' ? stored.updatedAt : '',
    detailHref
  }
}

const band = computed(() => summarize('band', bandStored.value, bandWeeks, bandTasks, '/band-study-plan.html'))
const japrs = computed(() => summarize('japrs', japrsStored.value, japrsWeeks, japrsTasks, '/exam/study-plan.html'))

const activeTracks = computed(() => {
  if (goal.value === 'band') return [band.value]
  if (goal.value === 'japrs') return [japrs.value]
  if (goal.value === 'both') return [band.value, japrs.value]
  return []
})

function matchesGoal(href: string) {
  const isExam = href.includes('/exam/')
  if (goal.value === 'both') return true
  if (goal.value === 'japrs') return isExam
  if (goal.value === 'band') return !isExam
  return false
}

function resolveHref(href: string) {
  const siteBase = withBase('/')
  if (siteBase !== '/' && href.startsWith(siteBase)) return href
  return withBase(href)
}

function continuationIsCurrent() {
  if (!lastLearning.value || !matchesGoal(lastLearning.value.href)) return false
  const lastTime = Date.parse(lastLearning.value.updatedAt)
  if (Number.isNaN(lastTime)) return true
  const relatedTrack = lastLearning.value.href.includes('/exam/') ? japrs.value : band.value
  const progressTime = Date.parse(relatedTrack.updatedAt)
  return Number.isNaN(progressTime) || lastTime >= progressTime
}

const today = computed(() => {
  if (lastLearning.value && continuationIsCurrent()) {
    return {
      eyebrow: '前回の続き',
      track: lastLearning.value.href.includes('/exam/') ? 'JAPRS' : 'バンド制作',
      title: lastLearning.value.title,
      body: '前回開いていた学習位置から再開します。',
      href: lastLearning.value.href,
      label: '続きから再開する'
    }
  }

  if ((goal.value === 'japrs' || goal.value === 'both') && japrs.value.completed === 0 && !guideCompleted.value) {
    return {
      eyebrow: '最初の3分',
      track: 'JAPRS',
      title: '試験の形と、最初の進み方を知る',
      body: 'いきなり問題は解きません。3分ガイドで地図を見てからWeek 1へ進みます。',
      href: '/exam/beginner-guide.html',
      label: '3分ガイドを読む'
    }
  }

  let track = activeTracks.value[0]
  if (activeTracks.value.length === 2) {
    track = band.value.percent <= japrs.value.percent ? band.value : japrs.value
  }
  if (!track) return null
  return {
    eyebrow: '今日の次の一手',
    track: track.shortName,
    title: track.nextTitle,
    body: '今日はここだけで大丈夫です。終えたら進捗にチェックを付けます。',
    href: track.nextHref,
    label: '今日の学習を始める'
  }
})

const goalLabel = computed(() => {
  if (goal.value === 'band') return 'バンド制作を進める'
  if (goal.value === 'japrs') return 'JAPRSを目指す'
  if (goal.value === 'both') return 'バンド制作とJAPRSを並行する'
  return ''
})

function chooseGoal(value: LearningGoal) {
  const previous = goal.value
  goal.value = value
  changingGoal.value = false
  try {
    window.localStorage.setItem(GOAL_KEY, JSON.stringify({
      version: 1,
      goal: value,
      updatedAt: new Date().toISOString()
    }))
  } catch {
    // 保存できない環境でも、このページを開いている間は選択を維持する。
  }
  if (!previous) window.setTimeout(() => document.querySelector<HTMLElement>('#today-action')?.focus(), 0)
}

function formatDate(value: string) {
  if (!value || Number.isNaN(Date.parse(value))) return 'まだ記録なし'
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

function handleProgressEvent() {
  refresh()
}

onMounted(() => {
  refresh()
  ready.value = true
  window.addEventListener('storage', handleProgressEvent)
  window.addEventListener('rec-lab:learning-progress', handleProgressEvent)
  window.addEventListener('focus', handleProgressEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleProgressEvent)
  window.removeEventListener('rec-lab:learning-progress', handleProgressEvent)
  window.removeEventListener('focus', handleProgressEvent)
})
</script>

<template>
  <div class="learning-home" :class="{ 'is-ready': ready }">
    <section v-if="!ready" class="loading-card" aria-live="polite">
      学習記録を読み込んでいます…
    </section>

    <section v-else-if="!goal || changingGoal" class="goal-picker" aria-labelledby="goal-picker-title">
      <p class="eyebrow">はじめの設定・約10秒</p>
      <h2 id="goal-picker-title">いま一番近い目的を選んでください</h2>
      <p class="lead">学習内容を消したり、進路を固定したりする設定ではありません。あとから何度でも変更できます。</p>

      <div class="goal-options">
        <button type="button" :aria-pressed="goal === 'band'" @click="chooseGoal('band')">
          <span class="goal-icon" aria-hidden="true">🎚️</span>
          <span><strong>バンド制作</strong><small>録音・編集・ミックスを12週間で実践</small></span>
        </button>
        <button type="button" :aria-pressed="goal === 'japrs'" @click="chooseGoal('japrs')">
          <span class="goal-icon" aria-hidden="true">📝</span>
          <span><strong>JAPRS</strong><small>未学習から16週間で試験範囲を学ぶ</small></span>
        </button>
        <button type="button" :aria-pressed="goal === 'both'" @click="chooseGoal('both')">
          <span class="goal-icon" aria-hidden="true">🎯</span>
          <span><strong>両方</strong><small>無理のないペースで2コースを並行</small></span>
        </button>
      </div>

      <button v-if="goal" type="button" class="cancel-button" @click="changingGoal = false">変更しない</button>
    </section>

    <template v-else>
      <header class="dashboard-heading">
        <div>
          <p class="eyebrow">MY LEARNING HOME</p>
          <h2>{{ goalLabel }}</h2>
        </div>
        <button type="button" class="change-button" @click="changingGoal = true">目的を変更</button>
      </header>

      <a
        v-if="today"
        id="today-action"
        class="today-card"
        :href="resolveHref(today.href)"
      >
        <span class="today-topline"><strong>{{ today.eyebrow }}</strong><small>{{ today.track }}</small></span>
        <span class="today-title">{{ today.title }}</span>
        <span class="today-body">{{ today.body }}</span>
        <span class="today-button">{{ today.label }} <span aria-hidden="true">→</span></span>
      </a>

      <section class="track-section" aria-labelledby="track-summary-title">
        <div class="section-heading">
          <h2 id="track-summary-title">コースの進み具合</h2>
          <p>詳しいチェックとメモは各コースで編集できます。</p>
        </div>

        <div class="track-grid">
          <article v-for="track in activeTracks" :key="track.id" class="track-card">
            <header>
              <div>
                <span>{{ track.id === 'band' ? '12-WEEK PRACTICE' : '16-WEEK EXAM' }}</span>
                <h3>{{ track.name }}</h3>
              </div>
              <strong>{{ track.percent }}%</strong>
            </header>
            <div
              class="track-progress"
              role="progressbar"
              :aria-label="`${track.name}の進捗`"
              :aria-valuenow="track.percent"
              aria-valuemin="0"
              aria-valuemax="100"
            ><span :style="{ width: `${track.percent}%` }" /></div>
            <p class="track-count">{{ track.completedWeeks }} / {{ track.totalWeeks }}週 · {{ track.completed }} / {{ track.total }}項目</p>
            <p class="track-next"><small>次にやること</small><strong>{{ track.nextTitle }}</strong></p>
            <footer>
              <a :href="withBase(track.detailHref)">詳しい進捗を開く</a>
              <small>最終保存 {{ formatDate(track.updatedAt) }}</small>
            </footer>
          </article>
        </div>
      </section>

      <aside class="storage-note">
        <strong>この端末だけに保存されます</strong>
        <span>目的と進捗はGitHubやChatGPTへ送信されません。端末を替えるときは各コースのバックアップを使ってください。</span>
      </aside>
    </template>
  </div>
</template>

<style scoped>
.learning-home {
  --home-radius: 18px;
  margin: 22px 0 34px;
}

.loading-card,
.goal-picker,
.today-card,
.track-card,
.storage-note {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--home-radius);
  background: var(--vp-c-bg-soft);
}

.loading-card {
  min-height: 160px;
  padding: 28px;
  color: var(--vp-c-text-2);
}

.goal-picker {
  padding: clamp(22px, 5vw, 38px);
  background:
    linear-gradient(145deg, var(--vp-c-brand-soft), transparent 58%),
    var(--vp-c-bg-soft);
}

.eyebrow {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .12em;
}

.goal-picker h2,
.dashboard-heading h2,
.section-heading h2 {
  margin: 6px 0 0;
  border: 0;
}

.goal-picker h2 {
  font-size: clamp(1.45rem, 5vw, 2rem);
  line-height: 1.35;
}

.lead {
  max-width: 660px;
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}

.goal-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.goal-options button {
  display: flex;
  min-height: 116px;
  gap: 12px;
  align-items: flex-start;
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.goal-options button:hover,
.goal-options button[aria-pressed='true'] {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.goal-options button:focus-visible,
.change-button:focus-visible,
.cancel-button:focus-visible,
.today-card:focus-visible,
.track-card a:focus-visible {
  outline: 3px solid var(--vp-c-brand-2);
  outline-offset: 3px;
}

.goal-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.goal-options button > span:last-child {
  display: grid;
  gap: 7px;
}

.goal-options strong {
  font-size: 1rem;
}

.goal-options small {
  color: var(--vp-c-text-2);
  font-size: .82rem;
  line-height: 1.55;
}

.cancel-button,
.change-button {
  min-height: 44px;
  padding: 0 15px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font: inherit;
  font-size: .86rem;
  font-weight: 700;
  cursor: pointer;
}

.cancel-button {
  margin-top: 16px;
}

.dashboard-heading {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.dashboard-heading h2 {
  font-size: clamp(1.35rem, 4vw, 1.8rem);
}

.today-card {
  display: grid;
  gap: 10px;
  padding: clamp(22px, 5vw, 34px);
  color: var(--vp-c-text-1) !important;
  background:
    linear-gradient(135deg, var(--vp-c-brand-soft), transparent 62%),
    var(--vp-c-bg-soft);
  text-decoration: none !important;
  box-shadow: 0 14px 38px rgba(15, 23, 42, .08);
}

.today-card:hover {
  border-color: var(--vp-c-brand-1);
}

.today-topline {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.today-topline strong {
  color: var(--vp-c-brand-1);
  font-size: .76rem;
  letter-spacing: .11em;
}

.today-topline small {
  padding: 4px 9px;
  border-radius: 999px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-size: .75rem;
  font-weight: 700;
}

.today-title {
  max-width: 760px;
  font-size: clamp(1.35rem, 4vw, 1.9rem);
  font-weight: 800;
  line-height: 1.4;
}

.today-body {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.today-button {
  display: inline-flex;
  width: fit-content;
  min-height: 46px;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  padding: 0 18px;
  border-radius: 999px;
  color: var(--vp-button-brand-text, #fff);
  background: var(--vp-c-brand-1);
  font-weight: 800;
}

.track-section {
  margin-top: 32px;
}

.section-heading p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: .9rem;
}

.track-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.track-grid:has(.track-card:only-child) {
  grid-template-columns: minmax(0, 680px);
}

.track-card {
  padding: 20px;
  background: var(--vp-c-bg);
}

.track-card > header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.track-card header span {
  color: var(--vp-c-brand-1);
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .1em;
}

.track-card h3 {
  margin: 3px 0 0;
  font-size: 1rem;
  line-height: 1.45;
}

.track-card header > strong {
  color: var(--vp-c-brand-1);
  font-size: 1.45rem;
  line-height: 1;
}

.track-progress {
  height: 9px;
  margin-top: 18px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.track-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--vp-c-brand-1);
}

.track-count {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: .82rem;
}

.track-next {
  display: grid;
  gap: 4px;
  margin: 18px 0;
  line-height: 1.5;
}

.track-next small {
  color: var(--vp-c-text-2);
  font-size: .78rem;
}

.track-next strong {
  font-size: .91rem;
}

.track-card footer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.track-card footer a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  font-weight: 750;
}

.track-card footer small {
  color: var(--vp-c-text-3);
  font-size: .72rem;
  text-align: right;
}

.storage-note {
  display: grid;
  gap: 4px;
  margin-top: 18px;
  padding: 16px 18px;
  color: var(--vp-c-text-2);
  font-size: .82rem;
  line-height: 1.6;
}

.storage-note strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .goal-options,
  .track-grid,
  .track-grid:has(.track-card:only-child) {
    grid-template-columns: 1fr;
  }

  .goal-options button {
    min-height: 92px;
  }

  .dashboard-heading {
    align-items: flex-start;
  }

  .change-button {
    flex: 0 0 auto;
  }
}

@media (max-width: 480px) {
  .goal-picker,
  .today-card,
  .track-card {
    border-radius: 15px;
  }

  .goal-picker {
    padding: 20px;
  }

  .goal-options {
    gap: 9px;
    margin-top: 18px;
  }

  .goal-options button {
    width: 100%;
    min-height: 88px;
    padding: 15px;
  }

  .dashboard-heading {
    display: grid;
  }

  .change-button {
    justify-self: start;
  }

  .today-card {
    padding: 20px;
  }

  .today-button {
    width: 100%;
    justify-content: center;
  }

  .track-card footer {
    display: grid;
  }

  .track-card footer small {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track-progress span {
    transition: none;
  }
}
</style>
