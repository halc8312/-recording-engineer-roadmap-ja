<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import {
  domainLabels,
  examQuestions,
  type ExamDomain,
  type ExamQuestion
} from '../data/examQuestions'

type ExamMode = 'quick' | 'domain' | 'full'
type Phase = 'setup' | 'running' | 'results'

type ExamSession = {
  version: 1
  mode: ExamMode
  domain?: ExamDomain
  questionIds: string[]
  answers: Record<string, number>
  flagged: string[]
  currentIndex: number
  startedAt: string
  deadline?: string
  submittedAt?: string
}

type HistoryEntry = {
  id: string
  submittedAt: string
  mode: ExamMode
  domain?: ExamDomain
  correct: number
  total: number
  percent: number
}

const STORAGE_KEY = 'rec-lab-japrs-exam-session-v1'
const HISTORY_KEY = 'rec-lab-japrs-exam-history-v1'
const phase = ref<Phase>('setup')
const selectedMode = ref<ExamMode>('quick')
const selectedDomain = ref<ExamDomain>(1)
const session = ref<ExamSession | null>(null)
const savedSession = ref<ExamSession | null>(null)
const history = ref<HistoryEntry[]>([])
const timeLeft = ref(0)
const message = ref('')
const showOnlyIncorrect = ref(true)
const questionTitle = ref<HTMLElement | null>(null)
const domains: ExamDomain[] = [1, 2, 3, 4]
let timer: number | undefined

const questionMap = new Map(examQuestions.map((question) => [question.id, question]))
const sessionQuestions = computed(() =>
  session.value?.questionIds
    .map((id) => questionMap.get(id))
    .filter((question): question is ExamQuestion => Boolean(question)) ?? []
)
const currentQuestion = computed(() => sessionQuestions.value[session.value?.currentIndex ?? 0])
const answeredCount = computed(() =>
  session.value
    ? session.value.questionIds.filter((id) => Number.isInteger(session.value?.answers[id])).length
    : 0
)
const isCurrentFlagged = computed(() =>
  Boolean(currentQuestion.value && session.value?.flagged.includes(currentQuestion.value.id))
)
const progressPercent = computed(() => {
  if (!sessionQuestions.value.length) return 0
  return Math.round(((session.value?.currentIndex ?? 0) + 1) / sessionQuestions.value.length * 100)
})

const results = computed(() => {
  const questions = sessionQuestions.value
  const correct = questions.filter(
    (question) => session.value?.answers[question.id] === question.correctIndex
  ).length
  const byDomain = domains.map((domain) => {
    const domainQuestions = questions.filter((question) => question.domain === domain)
    const domainCorrect = domainQuestions.filter(
      (question) => session.value?.answers[question.id] === question.correctIndex
    ).length
    return { domain, total: domainQuestions.length, correct: domainCorrect }
  }).filter((item) => item.total > 0)
  const score = questions.length ? Math.round((correct / questions.length) * 1000) : 0
  const referenceRank = score >= 901 ? 'A' : score >= 701 ? 'B' : score >= 451 ? 'C' : score >= 201 ? 'D' : 'E'
  return {
    total: questions.length,
    correct,
    percent: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    score,
    referenceRank,
    byDomain
  }
})

const reviewQuestions = computed(() => {
  if (!showOnlyIncorrect.value) return sessionQuestions.value
  return sessionQuestions.value.filter(
    (question) => session.value?.answers[question.id] !== question.correctIndex
  )
})

function randomInt(maxExclusive: number) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const value = new Uint32Array(1)
    crypto.getRandomValues(value)
    return value[0] % maxExclusive
  }
  return Math.floor(Math.random() * maxExclusive)
}

function shuffled<T>(items: T[]) {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1)
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

function isValidSession(value: unknown): value is ExamSession {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ExamSession>
  if (candidate.version !== 1 || !['quick', 'domain', 'full'].includes(candidate.mode ?? '')) return false
  if (!Array.isArray(candidate.questionIds) || candidate.questionIds.length === 0) return false
  if (!candidate.questionIds.every((id) => typeof id === 'string' && questionMap.has(id))) return false
  if (new Set(candidate.questionIds).size !== candidate.questionIds.length) return false
  if (!candidate.answers || typeof candidate.answers !== 'object' || !Array.isArray(candidate.flagged)) return false
  if (!Object.entries(candidate.answers).every(([id, answer]) =>
    candidate.questionIds?.includes(id) && Number.isInteger(answer) && answer >= 0 && answer <= 3
  )) return false
  if (!candidate.flagged.every((id) => typeof id === 'string' && candidate.questionIds?.includes(id))) return false
  if (
    !Number.isInteger(candidate.currentIndex)
    || (candidate.currentIndex ?? -1) < 0
    || (candidate.currentIndex ?? 0) >= candidate.questionIds.length
  ) return false
  return typeof candidate.startedAt === 'string'
}

function saveSession() {
  if (typeof window === 'undefined' || !session.value) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session.value))
  } catch {
    message.value = '回答を端末へ保存できませんでした。ブラウザの保存設定を確認してください。'
  }
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Partial<HistoryEntry>
  return typeof entry.id === 'string'
    && typeof entry.submittedAt === 'string'
    && !Number.isNaN(Date.parse(entry.submittedAt))
    && ['quick', 'domain', 'full'].includes(entry.mode ?? '')
    && typeof entry.correct === 'number'
    && Number.isInteger(entry.correct)
    && typeof entry.total === 'number'
    && Number.isInteger(entry.total)
    && (entry.total ?? 0) > 0
    && (entry.correct ?? -1) >= 0
    && (entry.correct ?? 0) <= (entry.total ?? 0)
    && typeof entry.percent === 'number'
    && Number.isInteger(entry.percent)
}

function appendHistory() {
  if (!session.value?.submittedAt) return
  const entry: HistoryEntry = {
    id: session.value.submittedAt,
    submittedAt: session.value.submittedAt,
    mode: session.value.mode,
    domain: session.value.domain,
    correct: results.value.correct,
    total: results.value.total,
    percent: results.value.percent
  }
  history.value = [entry, ...history.value.filter((item) => item.id !== entry.id)].slice(0, 10)
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
  } catch {
    message.value = '採点は完了しましたが、履歴を端末へ保存できませんでした。'
  }
}

function clearHistory() {
  if (!window.confirm('最近の模試結果をすべて削除しますか？')) return
  history.value = []
  window.localStorage.removeItem(HISTORY_KEY)
}

function createQuestionSet(mode: ExamMode, domain?: ExamDomain) {
  if (mode === 'quick') {
    const base = domains.flatMap((item) =>
      shuffled(examQuestions.filter((question) => question.domain === item)).slice(0, 2)
    )
    const baseIds = new Set(base.map((question) => question.id))
    const extras = shuffled(examQuestions.filter((question) => !baseIds.has(question.id))).slice(0, 2)
    return shuffled([...base, ...extras])
  }
  if (mode === 'domain') {
    return shuffled(examQuestions.filter((question) => question.domain === domain)).slice(0, 25)
  }
  return domains.flatMap((item) =>
    shuffled(examQuestions.filter((question) => question.domain === item)).slice(0, 25)
  )
}

function startExam() {
  const picked = createQuestionSet(selectedMode.value, selectedDomain.value)
  const expected = selectedMode.value === 'quick' ? 10 : selectedMode.value === 'domain' ? 25 : 100
  if (picked.length < expected) {
    message.value = `問題データが不足しています（必要${expected}問／利用可能${picked.length}問）。`
    return
  }
  const now = new Date()
  const minutes = selectedMode.value === 'full' ? 90 : selectedMode.value === 'domain' ? 25 : 10
  session.value = {
    version: 1,
    mode: selectedMode.value,
    domain: selectedMode.value === 'domain' ? selectedDomain.value : undefined,
    questionIds: picked.map((question) => question.id),
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt: now.toISOString(),
    deadline: new Date(now.getTime() + minutes * 60_000).toISOString()
  }
  savedSession.value = null
  phase.value = 'running'
  message.value = ''
  startTimer()
  focusQuestion()
}

function resumeExam() {
  if (!savedSession.value) return
  session.value = savedSession.value
  savedSession.value = null
  if (session.value.submittedAt) {
    phase.value = 'results'
  } else {
    phase.value = 'running'
    startTimer()
    focusQuestion()
  }
}

function discardSaved() {
  if (!window.confirm('保存されている途中結果を削除しますか？')) return
  window.localStorage.removeItem(STORAGE_KEY)
  savedSession.value = null
}

function answer(index: number) {
  if (!session.value || !currentQuestion.value) return
  session.value.answers[currentQuestion.value.id] = index
}

function goTo(index: number) {
  if (!session.value || index < 0 || index >= sessionQuestions.value.length) return
  session.value.currentIndex = index
  focusQuestion()
}

function focusQuestion() {
  nextTick(() => questionTitle.value?.focus())
}

function toggleFlag() {
  if (!session.value || !currentQuestion.value) return
  const id = currentQuestion.value.id
  session.value.flagged = session.value.flagged.includes(id)
    ? session.value.flagged.filter((item) => item !== id)
    : [...session.value.flagged, id]
}

function submitExam(automatic = false) {
  if (!session.value) return
  const unanswered = session.value.questionIds.length - answeredCount.value
  if (!automatic && !window.confirm(
    unanswered > 0
      ? `未回答が${unanswered}問あります。採点しますか？`
      : '回答を確定して採点しますか？'
  )) return
  session.value.submittedAt = new Date().toISOString()
  phase.value = 'results'
  stopTimer()
  saveSession()
  message.value = automatic ? '制限時間になったため、自動で採点しました。' : ''
  appendHistory()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function newAttempt() {
  stopTimer()
  session.value = null
  savedSession.value = null
  phase.value = 'setup'
  message.value = ''
  window.localStorage.removeItem(STORAGE_KEY)
}

function startTimer() {
  stopTimer()
  updateTimer()
  timer = window.setInterval(updateTimer, 1000)
}

function stopTimer() {
  if (timer !== undefined) window.clearInterval(timer)
  timer = undefined
}

function updateTimer() {
  if (!session.value?.deadline || session.value.submittedAt) return
  timeLeft.value = Math.max(0, Math.ceil((Date.parse(session.value.deadline) - Date.now()) / 1000))
  if (timeLeft.value <= 0) submitExam(true)
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

function choiceLabel(index: number) {
  return String.fromCharCode(65 + index)
}

function modeLabel(entry: HistoryEntry) {
  if (entry.mode === 'full') return '100問'
  if (entry.mode === 'domain') return `分野${entry.domain ?? ''}・25問`
  return '10問'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(value))
}

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (isValidSession(parsed)) savedSession.value = parsed
      else window.localStorage.removeItem(STORAGE_KEY)
    }
    const rawHistory = window.localStorage.getItem(HISTORY_KEY)
    if (rawHistory) {
      const parsedHistory = JSON.parse(rawHistory) as unknown
      if (Array.isArray(parsedHistory)) history.value = parsedHistory.filter(isHistoryEntry).slice(0, 10)
      else window.localStorage.removeItem(HISTORY_KEY)
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem(HISTORY_KEY)
    message.value = '壊れた途中データを削除しました。新しく開始できます。'
  }
})

watch(session, saveSession, { deep: true })
onBeforeUnmount(stopTimer)
</script>

<template>
  <div class="exam-quiz">
    <p v-if="message" class="quiz-message" role="status">{{ message }}</p>

    <section v-if="phase === 'setup'" class="setup-card" aria-labelledby="quiz-setup-title">
      <div>
        <p class="quiz-eyebrow">ORIGINAL PRACTICE</p>
        <h2 id="quiz-setup-title">問題練習を選ぶ</h2>
        <p>{{ examQuestions.length }}問収録。問題・選択肢・解説は、このサイトが独自に作成したもので、公式問題ではありません。</p>
      </div>

      <div v-if="savedSession" class="resume-card">
        <strong>{{ savedSession.submittedAt ? '前回の結果があります' : '途中の回答があります' }}</strong>
        <span>{{ savedSession.questionIds.length }}問・{{ Object.keys(savedSession.answers).length }}問回答済み</span>
        <div>
          <button type="button" class="primary-button" @click="resumeExam">
            {{ savedSession.submittedAt ? '結果を見る' : '途中から再開' }}
          </button>
          <button type="button" class="text-button" @click="discardSaved">削除</button>
        </div>
      </div>

      <fieldset class="mode-options">
        <legend>練習形式</legend>
        <label>
          <input v-model="selectedMode" type="radio" value="quick">
          <span><strong>10問ウォームアップ（任意）</strong><small>全分野から10問・10分</small></span>
        </label>
        <label>
          <input v-model="selectedMode" type="radio" value="domain">
          <span><strong>分野別25問</strong><small>選んだ分野を集中・25分</small></span>
        </label>
        <label>
          <input v-model="selectedMode" type="radio" value="full">
          <span><strong>本番形式100問</strong><small>4分野×25問・90分</small></span>
        </label>
      </fieldset>

      <label v-if="selectedMode === 'domain'" class="domain-select">
        <span>分野</span>
        <select v-model="selectedDomain">
          <option v-for="domain in domains" :key="domain" :value="domain">
            {{ domainLabels[domain] }}
          </option>
        </select>
      </label>

      <button type="button" class="primary-button start-button" @click="startExam">開始する</button>

      <details v-if="history.length" class="attempt-history">
        <summary>最近の結果（最大10件）</summary>
        <ul>
          <li v-for="entry in history" :key="entry.id">
            <span>{{ formatDate(entry.submittedAt) }}・{{ modeLabel(entry) }}</span>
            <strong>{{ entry.correct }} / {{ entry.total }}（{{ entry.percent }}%）</strong>
          </li>
        </ul>
        <button type="button" class="text-button" @click="clearHistory">履歴を削除</button>
      </details>
    </section>

    <template v-else-if="phase === 'running' && session && currentQuestion">
      <div class="exam-running">
        <section class="exam-toolbar" aria-label="試験の状況">
          <div>
            <span>問題 {{ session.currentIndex + 1 }} / {{ sessionQuestions.length }}</span>
            <span>{{ answeredCount }}問回答済み</span>
          </div>
          <strong role="timer" :aria-label="`残り時間 ${formatTime(timeLeft)}`">{{ formatTime(timeLeft) }}</strong>
        </section>
        <div class="quiz-progress" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
          <span :style="{ width: `${progressPercent}%` }" />
        </div>

        <article class="question-card">
          <p class="question-meta">{{ domainLabels[currentQuestion.domain] }} · {{ currentQuestion.topic }}</p>
          <h2 ref="questionTitle" tabindex="-1">{{ currentQuestion.prompt }}</h2>
          <fieldset class="choice-list">
            <legend class="visually-hidden">回答を1つ選択</legend>
            <label v-for="(choice, index) in currentQuestion.choices" :key="index">
              <input
                type="radio"
                :name="currentQuestion.id"
                :checked="session.answers[currentQuestion.id] === index"
                @change="answer(index)"
              >
              <span class="choice-letter">{{ choiceLabel(index) }}</span>
              <span>{{ choice }}</span>
            </label>
          </fieldset>

          <div class="question-actions" aria-label="問題の操作">
            <button type="button" class="secondary-button" :disabled="session.currentIndex === 0" @click="goTo(session.currentIndex - 1)">前の問題</button>
            <button type="button" class="flag-button" :aria-pressed="isCurrentFlagged" @click="toggleFlag">
              {{ isCurrentFlagged ? '見直しを解除' : 'あとで見直す' }}
            </button>
            <button
              v-if="session.currentIndex < sessionQuestions.length - 1"
              type="button"
              class="primary-button"
              @click="goTo(session.currentIndex + 1)"
            >次の問題</button>
            <button v-else type="button" class="primary-button" @click="submitExam(false)">採点する</button>
          </div>
        </article>

        <details class="question-navigator">
          <summary>問題一覧・見直し</summary>
          <div>
            <button
              v-for="(question, index) in sessionQuestions"
              :key="question.id"
              type="button"
              :class="{
                current: index === session.currentIndex,
                answered: Number.isInteger(session.answers[question.id]),
                flagged: session.flagged.includes(question.id)
              }"
              :aria-label="`問題${index + 1}${Number.isInteger(session.answers[question.id]) ? ' 回答済み' : ' 未回答'}${session.flagged.includes(question.id) ? ' 見直し対象' : ''}`"
              @click="goTo(index)"
            >{{ index + 1 }}</button>
          </div>
        </details>

        <button type="button" class="submit-button" @click="submitExam(false)">現在の回答を採点する</button>
      </div>
    </template>

    <section v-else-if="phase === 'results' && session" class="results" aria-labelledby="results-title">
      <div class="result-hero">
        <p class="quiz-eyebrow">RESULT</p>
        <h2 id="results-title">{{ results.correct }} / {{ results.total }}問正解</h2>
        <strong>{{ results.percent }}%</strong>
        <p v-if="session.mode === 'full'">1000点換算 {{ results.score }}点・参考ランク {{ results.referenceRank }}</p>
        <p v-else>短縮練習のため、参考ランクは100問形式で確認してください。</p>
      </div>

      <div class="rank-warning">
        100問形式の換算も独自問題による学習目安です。JAPRS公式の得点・認定ランクを予測または保証するものではありません。
      </div>

      <div class="domain-results">
        <article v-for="item in results.byDomain" :key="item.domain">
          <span>{{ domainLabels[item.domain] }}</span>
          <strong>{{ item.correct }} / {{ item.total }}</strong>
          <small>{{ Math.round(item.correct / item.total * 100) }}%</small>
        </article>
      </div>

      <div class="result-actions">
        <button type="button" class="primary-button" @click="newAttempt">別の問題を始める</button>
        <button type="button" class="secondary-button" @click="showOnlyIncorrect = !showOnlyIncorrect">
          {{ showOnlyIncorrect ? '全問題を表示' : '誤答だけ表示' }}
        </button>
      </div>

      <section class="review" aria-labelledby="review-title">
        <h2 id="review-title">{{ showOnlyIncorrect ? '誤答・未回答の復習' : '全問題の復習' }}</h2>
        <p v-if="reviewQuestions.length === 0">誤答はありません。時間を空け、別の問題で再確認してください。</p>
        <article v-for="(question, index) in reviewQuestions" :key="question.id" :class="{ correct: session.answers[question.id] === question.correctIndex }">
          <p>{{ domainLabels[question.domain] }} · {{ question.topic }}</p>
          <h3>{{ index + 1 }}. {{ question.prompt }}</h3>
          <dl>
            <div>
              <dt>あなたの回答</dt>
              <dd>{{ Number.isInteger(session.answers[question.id]) ? `${choiceLabel(session.answers[question.id])}. ${question.choices[session.answers[question.id]]}` : '未回答' }}</dd>
            </div>
            <div>
              <dt>正解</dt>
              <dd>{{ choiceLabel(question.correctIndex) }}. {{ question.choices[question.correctIndex] }}</dd>
            </div>
          </dl>
          <p class="explanation">{{ question.explanation }}</p>
          <a :href="withBase(question.lesson)">該当教材で復習する</a>
        </article>
      </section>
    </section>
  </div>
</template>

<style scoped>
.exam-quiz { margin: 28px 0; }
.quiz-message, .rank-warning { padding: 12px 15px; border-radius: 10px; background: var(--vp-c-warning-soft); color: var(--vp-c-text-1); }
.setup-card, .question-card, .results { border: 1px solid var(--vp-c-divider); border-radius: 20px; background: var(--vp-c-bg-soft); padding: clamp(20px, 4vw, 32px); }
.setup-card h2, .question-card h2, .results h2 { margin-top: 4px; border: 0; }
.quiz-eyebrow, .question-meta { margin: 0; color: var(--vp-c-brand-1); font-size: .72rem; font-weight: 700; letter-spacing: .08em; }
.resume-card { display: grid; gap: 8px; margin: 20px 0; padding: 16px; border: 1px solid var(--vp-c-brand-1); border-radius: 12px; background: var(--vp-c-brand-soft); }
.resume-card div, .question-actions, .result-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.mode-options { display: grid; gap: 10px; margin: 24px 0; padding: 0; border: 0; }
.mode-options legend { margin-bottom: 9px; font-weight: 700; }
.mode-options label, .choice-list label { display: flex; min-height: 54px; gap: 12px; align-items: center; padding: 12px 14px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); cursor: pointer; }
.mode-options label:has(input:checked), .choice-list label:has(input:checked) { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.mode-options input, .choice-list input { width: 19px; height: 19px; flex: 0 0 auto; accent-color: var(--vp-c-brand-1); }
.mode-options span { display: grid; }
.mode-options small { color: var(--vp-c-text-2); }
.domain-select { display: grid; gap: 7px; margin-bottom: 18px; font-weight: 700; }
.domain-select select { min-height: 44px; padding: 0 12px; border: 1px solid var(--vp-c-divider); border-radius: 10px; color: var(--vp-c-text-1); background: var(--vp-c-bg); }
.primary-button, .secondary-button, .text-button, .flag-button, .submit-button { min-height: 44px; padding: 0 17px; border: 1px solid var(--vp-c-divider); border-radius: 999px; font: inherit; font-weight: 700; cursor: pointer; }
.primary-button { border-color: var(--vp-c-brand-1); color: #fff; background: var(--vp-c-brand-1); }
.secondary-button, .flag-button { color: var(--vp-c-text-1); background: var(--vp-c-bg); }
.text-button { border-color: transparent; color: var(--vp-c-text-2); background: transparent; }
.start-button { width: 100%; }
.attempt-history { margin-top: 18px; padding: 12px 14px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); }
.attempt-history summary { min-height: 40px; font-weight: 700; cursor: pointer; }
.attempt-history ul { display: grid; gap: 8px; padding: 0; list-style: none; }
.attempt-history li { display: flex; flex-wrap: wrap; gap: 6px 14px; justify-content: space-between; color: var(--vp-c-text-2); font-size: .82rem; }
.attempt-history strong { color: var(--vp-c-text-1); font-variant-numeric: tabular-nums; }
button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 3px solid var(--vp-c-brand-2); outline-offset: 3px; }
button:disabled { opacity: .45; cursor: not-allowed; }
.exam-toolbar { display: flex; gap: 16px; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.exam-toolbar div { display: flex; flex-wrap: wrap; gap: 6px 16px; color: var(--vp-c-text-2); font-size: .85rem; }
.exam-toolbar > strong { font-variant-numeric: tabular-nums; font-size: 1.2rem; }
.quiz-progress { height: 7px; overflow: hidden; margin-bottom: 18px; border-radius: 999px; background: var(--vp-c-divider); }
.quiz-progress span { display: block; height: 100%; background: var(--vp-c-brand-1); transition: width .2s ease; }
.question-card h2 { font-size: clamp(1.2rem, 3vw, 1.6rem); line-height: 1.6; }
.question-card h2:focus-visible { outline: 3px solid var(--vp-c-brand-2); outline-offset: 6px; border-radius: 4px; }
.choice-list { display: grid; gap: 10px; margin: 24px 0; padding: 0; border: 0; }
.choice-letter { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; border-radius: 50%; background: var(--vp-c-default-soft); font-weight: 800; }
.question-actions { justify-content: space-between; }
.question-navigator { margin: 18px 0; padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 12px; }
.question-navigator summary { min-height: 44px; font-weight: 700; cursor: pointer; }
.question-navigator > div { display: grid; grid-template-columns: repeat(auto-fill, minmax(42px, 1fr)); gap: 7px; }
.question-navigator button { min-height: 44px; border: 1px solid var(--vp-c-divider); border-radius: 8px; color: var(--vp-c-text-2); background: var(--vp-c-bg); cursor: pointer; }
.question-navigator button.answered { border-color: var(--vp-c-brand-2); color: var(--vp-c-text-1); background: var(--vp-c-brand-soft); }
.question-navigator button.flagged::after { content: ' •'; color: var(--vp-c-warning-1); }
.question-navigator button.current { outline: 3px solid var(--vp-c-brand-1); outline-offset: 1px; }
.submit-button { width: 100%; color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); }
.result-hero { text-align: center; }
.result-hero > strong { display: block; color: var(--vp-c-brand-1); font-size: 3rem; line-height: 1; }
.domain-results { display: grid; gap: 10px; margin: 22px 0; }
.domain-results article { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; padding: 14px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg); }
.result-actions { margin: 22px 0; }
.review > article { margin: 16px 0; padding: 18px; border-left: 4px solid var(--vp-c-danger-1); border-radius: 8px; background: var(--vp-c-bg); }
.review > article.correct { border-color: var(--vp-c-brand-1); }
.review article > p:first-child { color: var(--vp-c-text-2); font-size: .8rem; }
.review h3 { margin: 6px 0 14px; font-size: 1rem; line-height: 1.6; }
.review dl, .review dl div { display: grid; gap: 4px; }
.review dl { gap: 10px; }
.review dt { color: var(--vp-c-text-2); font-size: .75rem; font-weight: 700; }
.review dd { margin: 0; }
.explanation { padding: 12px; border-radius: 8px; background: var(--vp-c-default-soft); }
:global(.dark) .primary-button {
  border-color: #5eead4;
  color: #062e2a;
  background: #5eead4;
}
:global(.dark) .secondary-button,
:global(.dark) .flag-button {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
}
@media (min-width: 700px) {
  .mode-options { grid-template-columns: repeat(3, 1fr); }
  .domain-results { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) {
  .exam-running {
    padding-bottom: calc(var(--rec-mobile-nav-height, calc(64px + env(safe-area-inset-bottom, 0px))) + 88px);
  }
  .exam-toolbar {
    position: sticky;
    z-index: 30;
    top: calc(var(--vp-nav-height, 64px) + 7px);
    min-height: 52px;
    margin: 0 -8px 8px;
    padding: 7px 12px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    background: var(--vp-c-bg);
    background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
    box-shadow: 0 8px 24px rgb(15 23 42 / 10%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .exam-toolbar div {
    display: grid;
    gap: 1px;
    font-size: .8rem;
  }
  .exam-toolbar > strong { font-size: 1.15rem; }
  .question-actions {
    position: fixed;
    z-index: 50;
    right: max(8px, env(safe-area-inset-right, 0px));
    bottom: var(--rec-mobile-nav-height, calc(64px + env(safe-area-inset-bottom, 0px)));
    left: max(8px, env(safe-area-inset-left, 0px));
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    padding: 8px;
    border: 1px solid var(--vp-c-divider);
    border-bottom: 0;
    border-radius: 14px 14px 0 0;
    background: var(--vp-c-bg);
    background: color-mix(in srgb, var(--vp-c-bg) 97%, transparent);
    box-shadow: 0 -8px 24px rgb(15 23 42 / 12%);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .question-actions button {
    min-height: 48px;
    padding: 4px 6px;
    border-radius: 10px;
    font-size: .875rem;
    line-height: 1.25;
    touch-action: manipulation;
  }
  .question-card { padding: 20px 16px; }
  .choice-list label { padding: 13px 12px; }
  .domain-select select { font-size: 16px; }
  .question-navigator > div { grid-template-columns: repeat(auto-fill, minmax(44px, 1fr)); }
  .question-navigator button { min-height: 44px; font-size: 16px; touch-action: manipulation; }
  :global(.dark) .exam-toolbar,
  :global(.dark) .question-actions {
    background: var(--vp-c-bg);
    background: color-mix(in srgb, var(--vp-c-bg) 97%, transparent);
    box-shadow: 0 -8px 26px rgb(0 0 0 / 34%);
  }
}
@media (max-width: 359px) {
  .question-actions { right: 4px; left: 4px; gap: 4px; padding: 6px 4px; }
  .question-actions button { padding: 3px; font-size: .8rem; }
}
@media (prefers-reduced-transparency: reduce) {
  .exam-toolbar,
  .question-actions {
    background: var(--vp-c-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
@media (prefers-reduced-motion: reduce) { .quiz-progress span { transition: none; } }
</style>
