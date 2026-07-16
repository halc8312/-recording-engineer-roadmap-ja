<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type WeekProgress = {
  id: number
  checks: boolean[]
  note: string
}

type Backup = {
  version: 1
  exportedAt?: string
  updatedAt?: string
  weeks: WeekProgress[]
}

const STORAGE_KEY = 'rec-lab-japrs-progress-v1'
const LAST_LEARNING_KEY = 'rec-lab-last-learning-v1'
const tasks = ['教材を読む', '資料なしで説明・計算する', '問題と遅延復習を行う'] as const
const weeks = [
  {
    id: 1,
    title: '音の三要素と波',
    lesson: '/exam/01-acoustics-hearing.html#week-1-start',
    range: '第1〜2節：音の物理量、波・周波数・周期・音速・波長'
  },
  {
    id: 2,
    title: '聴覚・心理音響・ステレオ',
    lesson: '/exam/01-acoustics-hearing.html#week-2-start',
    range: '第7〜10節：聴覚器官、等ラウドネス、マスキング、両耳聴、音色'
  },
  {
    id: 3,
    title: 'dB・波長・位相・音律',
    lesson: '/exam/01-acoustics-hearing.html#week-3-start',
    range: '第2節の式を復習後、第3〜4・11節：dB、位相・干渉、音程・音律・うなり'
  },
  {
    id: 4,
    title: '直流・オームの法則・電力',
    lesson: '/exam/02-electricity-circuits.html#week-4-start',
    range: '第1〜2節：電圧・電流・抵抗・電力、直列・並列・分圧'
  },
  {
    id: 5,
    title: '交流・回路・磁気',
    lesson: '/exam/02-electricity-circuits.html#week-5-start',
    range: '第3〜8節：交流、R/C/L、インピーダンス、フィルター、磁気、伝送と安全'
  },
  {
    id: 6,
    title: '配線・端子・バランス伝送',
    lesson: '/exam/03-studio-systems.html#week-6-start',
    range: '第2〜3節：レベル、ケーブル、端子、DI、バランス伝送、パッチベイ'
  },
  {
    id: 7,
    title: 'マイク・コンソール・モニター',
    lesson: '/exam/03-studio-systems.html#week-7-start',
    range: '第0〜1・4〜5・7節：マイク、信号経路、コンソール、メーター、モニター'
  },
  {
    id: 8,
    title: 'テープ・デジタル・クロック',
    lesson: '/exam/03-studio-systems.html#week-8-start',
    range: '第0.4〜0.5節を復習後、第6・8〜10節：テープ、デジタル、クロック、実機接続'
  },
  {
    id: 9,
    title: 'ステレオ収音とアンサンブル',
    lesson: '/exam/04-recording-advanced.html#week-9-start',
    range: '第1〜4節：録音方式、ペアマイク、オーケストラ、リズム録音'
  },
  {
    id: 10,
    title: 'オーバーダブ・ミックス・ライブ',
    lesson: '/exam/04-recording-advanced.html#week-10-start',
    range: '第5〜7節：オーバーダブ、ミックス／マスタリング、ライブ録音'
  },
  {
    id: 11,
    title: '同期・サラウンド・立体音響',
    lesson: '/exam/04-recording-advanced.html#week-11-start',
    range: '第8〜10節：タイムコード、映像同期、5.1、22.2、イマーシブ音響'
  },
  {
    id: 12,
    title: '楽譜・テンポ・音程・楽語',
    lesson: '/exam/05-music-theory-instruments.html#week-12-start',
    range: '第1〜9節：譜面、拍子、BPM、楽語、音程、調、音律、移調楽器'
  },
  {
    id: 13,
    title: '楽器族・構造・音域',
    lesson: '/exam/05-music-theory-instruments.html#week-13-start',
    range: '第10〜15節：弦・木管・金管・打楽器・鍵盤・声、楽器名と編成'
  },
  {
    id: 14,
    title: '著作権・著作隣接権・権利処理',
    lesson: '/exam/06-copyright-history-staff.html#week-14-start',
    range: '第1〜7節：権利の種類、保護期間、権利制限、バンド制作の確認'
  },
  {
    id: 15,
    title: '録音史・スタッフ・音響設計',
    lesson: '/exam/06-copyright-history-staff.html#week-15-start',
    range: '06の第8〜11節：録音史・制作スタッフ。その後、07の音響設計を全章',
    extraLesson: '/exam/07-studio-acoustics-design.html#week-15-acoustics',
    extraLabel: '後半：スタジオ音響設計を開く'
  },
  {
    id: 16,
    title: '100問模試と誤答の再学習',
    lesson: '/exam/mock-exam.html#week-16-start',
    range: '本番形式100問→分野別結果→誤答した教材→再学習計画'
  }
] as const

const progress = ref<WeekProgress[]>(blankProgress())
const ready = ref(false)
const updatedAt = ref('')
const message = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function blankProgress(): WeekProgress[] {
  return weeks.map((week) => ({ id: week.id, checks: tasks.map(() => false), note: '' }))
}

const completed = computed(() =>
  progress.value.reduce((sum, week) => sum + week.checks.filter(Boolean).length, 0)
)
const total = weeks.length * tasks.length
const percent = computed(() => Math.round(completed.value / total * 100))
const nextIndex = computed(() => progress.value.findIndex((week) => !week.checks.every(Boolean)))
const nextWeek = computed(() => nextIndex.value < 0 ? undefined : weeks[nextIndex.value])

function normalize(value: unknown): WeekProgress[] {
  if (!value || typeof value !== 'object') throw new Error('バックアップの形式が正しくありません。')
  const data = value as Partial<Backup>
  if (data.version !== 1 || !Array.isArray(data.weeks)) {
    throw new Error('この試験コース用のバックアップではありません。')
  }
  const stored = new Map(data.weeks.map((week) => [Number(week.id), week]))
  return weeks.map((week) => {
    const item = stored.get(week.id)
    return {
      id: week.id,
      checks: tasks.map((_, index) => item?.checks?.[index] === true),
      note: typeof item?.note === 'string' ? item.note.slice(0, 1200) : ''
    }
  })
}

function save() {
  if (!ready.value || typeof window === 'undefined') return
  try {
    const now = new Date().toISOString()
    const backup: Backup = { version: 1, updatedAt: now, weeks: progress.value }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(backup))
    updatedAt.value = now
  } catch {
    message.value = '進捗を保存できませんでした。ブラウザの保存設定を確認してください。'
  }
}

function formatDate(value: string) {
  if (!value || Number.isNaN(Date.parse(value))) return '未保存'
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(value))
}

function exportBackup() {
  const backup: Backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    updatedAt: updatedAt.value || undefined,
    weeks: progress.value
  }
  const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `rec-lab-japrs-${new Date().toISOString().slice(0, 10)}.json`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  message.value = '進捗バックアップを書き出しました。'
}

function chooseBackup() {
  fileInput.value?.click()
}

async function importBackup(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    progress.value = normalize(JSON.parse(await file.text()) as unknown)
    save()
    message.value = 'バックアップを読み込みました。'
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'バックアップを読み込めませんでした。'
  } finally {
    input.value = ''
  }
}

function reset() {
  if (!window.confirm('試験コースのチェックとメモをすべて消去しますか？')) return
  progress.value = blankProgress()
  window.localStorage.removeItem(STORAGE_KEY)
  updatedAt.value = ''
  message.value = '進捗をリセットしました。'
}

function recordLearning(href: string, title: string) {
  if (typeof window === 'undefined') return
  try {
    const record = { href: withBase(href), title, updatedAt: new Date().toISOString() }
    window.localStorage.setItem(LAST_LEARNING_KEY, JSON.stringify(record))
    window.dispatchEvent(new CustomEvent('rec-lab:learning-progress', { detail: record }))
  } catch {
    message.value = '「続きから」の位置を保存できませんでした。'
  }
}

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Backup
      progress.value = normalize(parsed)
      updatedAt.value = typeof parsed.updatedAt === 'string' ? parsed.updatedAt : ''
    }
  } catch {
    message.value = '保存済み進捗を読み込めませんでした。新しく記録できます。'
  } finally {
    ready.value = true
  }
})

watch(progress, save, { deep: true })
</script>

<template>
  <div class="exam-progress">
    <section class="overview" aria-labelledby="exam-progress-title">
      <div>
        <p>16-WEEK TRACKER</p>
        <h2 id="exam-progress-title">{{ percent }}% 完了</h2>
        <span>{{ completed }} / {{ total }}項目・最終保存 {{ formatDate(updatedAt) }}</span>
      </div>
      <div class="progressbar" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <span :style="{ width: `${percent}%` }" />
      </div>
      <a
        v-if="nextWeek"
        class="next-link"
        :href="withBase(nextWeek.lesson)"
        @click="recordLearning(nextWeek.lesson, `JAPRS Week ${nextWeek.id}：${nextWeek.title}`)"
      >
        次：Week {{ nextWeek.id }}「{{ nextWeek.title }}」を開く
      </a>
      <p v-else class="complete">全項目が完了しました。未見問題で定着を確認してください。</p>
    </section>

    <p v-if="message" class="message" role="status">{{ message }}</p>

    <div class="week-list">
      <details
        v-for="(week, index) in weeks"
        :key="week.id"
        :open="index === nextIndex"
      >
        <summary>
          <span>Week {{ week.id }}</span>
          <strong>{{ week.title }}</strong>
          <small>{{ progress[index].checks.filter(Boolean).length }} / {{ tasks.length }}</small>
        </summary>
        <div class="week-body">
          <p class="week-scope"><strong>読む範囲</strong><span>{{ week.range }}</span></p>
          <label v-for="(task, taskIndex) in tasks" :key="task">
            <input v-model="progress[index].checks[taskIndex]" type="checkbox">
            <span>{{ task }}</span>
          </label>
          <label class="note">
            <span>わからない点・気づき・次に確認すること</span>
            <textarea v-model="progress[index].note" maxlength="1200" rows="3" placeholder="例：dBの2つの式の使い分けを、2日後にもう一度確認する。" />
          </label>
          <div class="lesson-links">
            <a
              :href="withBase(week.lesson)"
              @click="recordLearning(week.lesson, `JAPRS Week ${week.id}：${week.title}`)"
            >Week {{ week.id }}の教材を読む</a>
            <a
              v-if="'extraLesson' in week"
              :href="withBase(week.extraLesson)"
              @click="recordLearning(week.extraLesson, `JAPRS Week ${week.id}：${week.extraLabel}`)"
            >{{ week.extraLabel }}</a>
          </div>
        </div>
      </details>
    </div>

    <div class="backup-actions">
      <button type="button" @click="exportBackup">バックアップを書き出す</button>
      <button type="button" @click="chooseBackup">バックアップを読み込む</button>
      <button type="button" class="danger" @click="reset">リセット</button>
      <input ref="fileInput" class="visually-hidden" type="file" accept="application/json,.json" @change="importBackup">
    </div>
    <p class="storage-note">記録はこのブラウザだけに保存されます。PCとスマートフォンの移動にはバックアップを使ってください。</p>
  </div>
</template>

<style scoped>
.exam-progress { margin: 28px 0; }
.overview { display: grid; gap: 14px; padding: clamp(20px, 4vw, 30px); border: 1px solid var(--vp-c-divider); border-radius: 18px; background: var(--vp-c-bg-soft); }
.overview p { margin: 0; color: var(--vp-c-brand-1); font-size: .72rem; font-weight: 800; letter-spacing: .08em; }
.overview h2 { margin: 2px 0; border: 0; }
.overview span { color: var(--vp-c-text-2); font-size: .85rem; }
.progressbar { height: 9px; overflow: hidden; border-radius: 999px; background: var(--vp-c-divider); }
.progressbar span { display: block; height: 100%; background: var(--vp-c-brand-1); transition: width .2s ease; }
.next-link { width: fit-content; font-weight: 700; }
.complete { color: var(--vp-c-text-1) !important; font-size: .9rem !important; letter-spacing: 0 !important; }
.message { padding: 10px 13px; border-radius: 9px; background: var(--vp-c-brand-soft); }
.week-list { display: grid; gap: 9px; margin-top: 18px; }
.week-list details { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); }
.week-list summary { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; min-height: 52px; padding: 0 14px; cursor: pointer; }
.week-list summary span, .week-list summary small { color: var(--vp-c-text-2); font-size: .78rem; }
.week-body { display: grid; gap: 10px; padding: 4px 14px 16px; }
.week-scope { display: grid; gap: 3px; margin: 2px 0 4px; padding: 10px 12px; border-radius: 9px; background: var(--vp-c-bg-soft); }
.week-scope strong { color: var(--vp-c-brand-1); font-size: .75rem; }
.week-scope span { color: var(--vp-c-text-2); font-size: .84rem; line-height: 1.6; }
.week-body > label:not(.note) { display: flex; gap: 10px; align-items: center; min-height: 44px; }
.week-body input[type='checkbox'] { width: 19px; height: 19px; accent-color: var(--vp-c-brand-1); }
.note { display: grid; gap: 6px; color: var(--vp-c-text-2); font-size: .8rem; font-weight: 700; }
.note textarea { padding: 10px; border: 1px solid var(--vp-c-divider); border-radius: 9px; color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); font: inherit; resize: vertical; }
.lesson-links { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
.lesson-links a { display: inline-flex; align-items: center; min-height: 44px; font-weight: 700; }
.backup-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.backup-actions button { min-height: 44px; padding: 0 14px; border: 1px solid var(--vp-c-divider); border-radius: 999px; color: var(--vp-c-text-1); background: var(--vp-c-bg); font: inherit; font-weight: 700; cursor: pointer; }
.backup-actions button.danger { color: var(--vp-c-danger-1); }
.storage-note { color: var(--vp-c-text-2); font-size: .82rem; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 3px solid var(--vp-c-brand-2); outline-offset: 3px; }
@media (max-width: 767px) { .note textarea { font-size: 16px; } }
@media (prefers-reduced-motion: reduce) { .progressbar span { transition: none; } }
</style>
