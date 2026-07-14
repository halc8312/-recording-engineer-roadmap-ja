<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type WeekProgress = {
  id: number
  checks: boolean[]
  note: string
}

type ProgressBackup = {
  version: number
  exportedAt?: string
  updatedAt?: string
  weeks: WeekProgress[]
}

const STORAGE_KEY = 'rec-lab-okinawa-progress-v1'
const BACKUP_VERSION = 1

const checklist = [
  { label: '理論を読む', short: '理論' },
  { label: 'Cubase実習を行う', short: '実習' },
  { label: '耳トレ・小テストを行う', short: '耳トレ' },
  { label: '成果物と振り返りを残す', short: '成果物' }
] as const

const weekMeta = [
  {
    id: 1,
    title: 'システムと信号経路',
    outcome: '録音から書き出しまでを図で説明できる',
    lesson: '/lessons/01-audio-foundations.html#signal-flow',
    roadmap: '/ROADMAP.html#week-1'
  },
  {
    id: 2,
    title: '音、周波数、dB',
    outcome: 'dB計算と逆二乗則の基本問題を解ける',
    lesson: '/lessons/01-audio-foundations.html#sound-basics',
    roadmap: '/ROADMAP.html#week-2'
  },
  {
    id: 3,
    title: 'デジタル音声',
    outcome: 'sample rate、bit depth、clipping、ditherを説明できる',
    lesson: '/lessons/01-audio-foundations.html#digital-audio',
    roadmap: '/ROADMAP.html#week-3'
  },
  {
    id: 4,
    title: '電気音響とマイク',
    outcome: 'レベル、48V、極性と位相を区別できる',
    lesson: '/lessons/02-recording-editing.html#microphone-basics',
    roadmap: '/ROADMAP.html#week-4'
  },
  {
    id: 5,
    title: '収音と演奏',
    outcome: '2種類のマイク位置またはDI方法を比較できる',
    lesson: '/lessons/02-recording-editing.html#microphone-placement',
    roadmap: '/ROADMAP.html#week-5'
  },
  {
    id: 6,
    title: '編集とセッション管理',
    outcome: '非破壊で編集し、他人が開ける状態に整理できる',
    lesson: '/lessons/02-recording-editing.html#editing',
    roadmap: '/ROADMAP.html#week-6'
  },
  {
    id: 7,
    title: 'スタティックミックス',
    outcome: 'プラグインなしで曲の意図が伝わるバランスを作れる',
    lesson: '/lessons/03-mixing.html#static-mix',
    roadmap: '/ROADMAP.html#week-7'
  },
  {
    id: 8,
    title: 'EQ',
    outcome: '音量をそろえたA/BでEQの目的を説明できる',
    lesson: '/lessons/03-mixing.html#eq',
    roadmap: '/ROADMAP.html#week-8'
  },
  {
    id: 9,
    title: 'ダイナミクス',
    outcome: 'attack、release、ratioの狙いを言語化できる',
    lesson: '/lessons/03-mixing.html#compression',
    roadmap: '/ROADMAP.html#week-9'
  },
  {
    id: 10,
    title: '空間・ステレオ・自動化',
    outcome: 'モノ互換を確認し、必要な箇所だけ自動化できる',
    lesson: '/lessons/03-mixing.html#reverb-delay',
    roadmap: '/ROADMAP.html#week-10'
  },
  {
    id: 11,
    title: 'マスタリングとQC',
    outcome: 'masterを作り、測定値と聴感を記録できる',
    lesson: '/lessons/04-mastering-delivery.html#mastering-workflow',
    roadmap: '/ROADMAP.html#week-11'
  },
  {
    id: 12,
    title: '試験・権利・作品集',
    outcome: '模試、ケーススタディ、次の90日計画を完成できる',
    lesson: '/lessons/05-exam-career.html#japrs-scope',
    roadmap: '/ROADMAP.html#week-12'
  }
] as const

function blankProgress(): WeekProgress[] {
  return weekMeta.map((week) => ({
    id: week.id,
    checks: checklist.map(() => false),
    note: ''
  }))
}

const weeks = ref<WeekProgress[]>(blankProgress())
const isReady = ref(false)
const lastSaved = ref('')
const message = ref('')
const messageKind = ref<'success' | 'error' | 'neutral'>('neutral')
const importInput = ref<HTMLInputElement | null>(null)

function isComplete(week: WeekProgress) {
  return week.checks.every(Boolean)
}

const completedSteps = computed(() =>
  weeks.value.reduce((total, week) => total + week.checks.filter(Boolean).length, 0)
)
const totalSteps = weekMeta.length * checklist.length
const percent = computed(() => Math.round((completedSteps.value / totalSteps) * 100))
const completedWeeks = computed(() => weeks.value.filter(isComplete).length)
const nextWeekIndex = computed(() => weeks.value.findIndex((week) => !isComplete(week)))
const nextWeek = computed(() =>
  nextWeekIndex.value === -1 ? undefined : weekMeta[nextWeekIndex.value]
)
const nextStep = computed(() => {
  if (nextWeekIndex.value === -1) return '12週間完走。次の1曲でWeek 5〜11を繰り返す'
  const week = weeks.value[nextWeekIndex.value]
  const checkIndex = week.checks.findIndex((checked) => !checked)
  return checklist[checkIndex]?.label ?? '振り返りを残す'
})

function normalizeBackup(value: unknown): WeekProgress[] {
  if (!value || typeof value !== 'object') throw new Error('JSONの形式が正しくありません。')
  const backup = value as Partial<ProgressBackup>
  if (backup.version !== BACKUP_VERSION || !Array.isArray(backup.weeks)) {
    throw new Error('この教材用のバックアップではありません。')
  }

  const stored = new Map(backup.weeks.map((week) => [Number(week.id), week]))
  return weekMeta.map((meta) => {
    const week = stored.get(meta.id)
    return {
      id: meta.id,
      checks: checklist.map((_, index) => week?.checks?.[index] === true),
      note: typeof week?.note === 'string' ? week.note.slice(0, 2000) : ''
    }
  })
}

function showMessage(text: string, kind: 'success' | 'error' | 'neutral' = 'neutral') {
  message.value = text
  messageKind.value = kind
}

function saveProgress() {
  if (!isReady.value || typeof window === 'undefined') return
  try {
    const now = new Date().toISOString()
    const backup: ProgressBackup = {
      version: BACKUP_VERSION,
      updatedAt: now,
      weeks: weeks.value
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(backup))
    lastSaved.value = now
  } catch {
    showMessage('進捗を保存できませんでした。ブラウザの保存設定を確認してください。', 'error')
  }
}

function formatDate(iso: string) {
  if (!iso || Number.isNaN(Date.parse(iso))) return 'まだ保存されていません'
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(iso))
}

function toggleWeek(index: number) {
  const shouldComplete = !isComplete(weeks.value[index])
  weeks.value[index].checks = checklist.map(() => shouldComplete)
}

function exportBackup() {
  const payload: ProgressBackup = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    updatedAt: lastSaved.value || undefined,
    weeks: weeks.value
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  anchor.href = url
  anchor.download = `rec-lab-progress-${date}.json`
  anchor.style.display = 'none'
  document.body.append(anchor)
  anchor.click()
  window.setTimeout(() => {
    anchor.remove()
    URL.revokeObjectURL(url)
  }, 1000)
  showMessage('進捗バックアップを書き出しました。', 'success')
}

function chooseBackup() {
  importInput.value?.click()
}

async function importBackup(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    const parsed = JSON.parse(await file.text()) as unknown
    weeks.value = normalizeBackup(parsed)
    saveProgress()
    showMessage('バックアップを読み込みました。現在の進捗を置き換えています。', 'success')
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'ファイルを読み込めませんでした。'
    showMessage(detail, 'error')
  } finally {
    input.value = ''
  }
}

function resetProgress() {
  if (!window.confirm('12週間のチェックとメモをすべて消去しますか？')) return
  weeks.value = blankProgress()
  window.localStorage.removeItem(STORAGE_KEY)
  lastSaved.value = ''
  showMessage('進捗をリセットしました。', 'success')
}

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressBackup
      weeks.value = normalizeBackup(parsed)
      lastSaved.value =
        typeof parsed.updatedAt === 'string' && !Number.isNaN(Date.parse(parsed.updatedAt))
          ? parsed.updatedAt
          : ''
    }
  } catch {
    showMessage('保存済みデータを読み込めませんでした。バックアップがあれば読み込んでください。', 'error')
  } finally {
    isReady.value = true
  }
})

watch(weeks, saveProgress, { deep: true })
</script>

<template>
  <div class="study-progress" :class="{ 'is-loading': !isReady }">
    <section class="progress-overview" aria-labelledby="progress-overview-title">
      <div
        class="progress-ring"
        :style="{
          background: `conic-gradient(var(--vp-c-brand-1) ${percent * 3.6}deg, var(--vp-c-divider) 0deg)`
        }"
        role="progressbar"
        aria-label="全体の学習進捗"
        :aria-valuenow="percent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div>
          <strong>{{ percent }}%</strong>
          <span>{{ completedSteps }} / {{ totalSteps }}項目</span>
        </div>
      </div>

      <div class="progress-summary">
        <p class="eyebrow">YOUR NEXT MOVE</p>
        <h2 id="progress-overview-title">
          <template v-if="nextWeek">Week {{ nextWeek.id }}：{{ nextWeek.title }}</template>
          <template v-else>12週間、完走です</template>
        </h2>
        <p class="next-action">次にやること：<strong>{{ nextStep }}</strong></p>
        <div class="summary-stats" aria-label="進捗の要約">
          <span><strong>{{ completedWeeks }}</strong> / 12週 完了</span>
          <span>最終保存：{{ formatDate(lastSaved) }}</span>
        </div>
        <div class="summary-links">
          <a
            class="action-link primary"
            :href="withBase(nextWeek?.roadmap ?? '/ROADMAP.html')"
          >今週の手順を見る</a>
          <a
            v-if="nextWeek"
            class="action-link"
            :href="withBase(nextWeek.lesson)"
          >理論教材を開く</a>
        </div>
      </div>
    </section>

    <section class="backup-panel" aria-labelledby="backup-title">
      <div>
        <h2 id="backup-title">端末をまたぐとき</h2>
        <p>進捗はこのブラウザ内だけに保存されます。JSONを書き出すと、PCや別のスマートフォンへ移せます。</p>
      </div>
      <div class="backup-actions">
        <button type="button" class="secondary-button" @click="exportBackup">
          バックアップを書き出す
        </button>
        <button type="button" class="secondary-button" @click="chooseBackup">
          バックアップを読み込む
        </button>
        <input
          ref="importInput"
          class="visually-hidden"
          type="file"
          accept="application/json,.json"
          @change="importBackup"
        >
      </div>
      <p v-if="message" class="status-message" :class="messageKind" role="status">
        {{ message }}
      </p>
    </section>

    <section class="week-grid" aria-label="12週間の進捗">
      <article
        v-for="(meta, index) in weekMeta"
        :key="meta.id"
        class="week-card"
        :class="{ complete: isComplete(weeks[index]) }"
      >
        <header>
          <div>
            <span class="week-number">WEEK {{ meta.id }}</span>
            <h2>{{ meta.title }}</h2>
          </div>
          <span
            class="week-status"
            :aria-label="`${weeks[index].checks.filter(Boolean).length}/4項目完了`"
          >
            {{ isComplete(weeks[index]) ? '完了' : `${weeks[index].checks.filter(Boolean).length}/4` }}
          </span>
        </header>

        <p class="week-outcome">完了条件：{{ meta.outcome }}</p>

        <fieldset>
          <legend class="visually-hidden">Week {{ meta.id }}のチェック項目</legend>
          <label v-for="(item, checkIndex) in checklist" :key="item.short" class="check-row">
            <input v-model="weeks[index].checks[checkIndex]" type="checkbox">
            <span>{{ item.label }}</span>
          </label>
        </fieldset>

        <label class="note-field">
          <span>判断・疑問・次に試すこと</span>
          <textarea
            v-model="weeks[index].note"
            rows="3"
            maxlength="2000"
            :placeholder="`Week ${meta.id}の短いメモ`"
          />
        </label>

        <footer>
          <div class="week-links">
            <a :href="withBase(meta.roadmap)">今週の手順</a>
            <a :href="withBase(meta.lesson)">理論教材</a>
          </div>
          <button type="button" class="text-button" @click="toggleWeek(index)">
            {{ isComplete(weeks[index]) ? '完了を取り消す' : '4項目を完了' }}
          </button>
        </footer>
      </article>
    </section>

    <div class="danger-zone">
      <button type="button" class="reset-button" @click="resetProgress">すべての進捗をリセット</button>
    </div>
  </div>
</template>
