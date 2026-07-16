<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

type ReadingPosition = {
  href: string
  title: string
  heading: string
  scrollY: number
  updatedAt: string
}

type ReadingStore = {
  version: 1
  lessons: Record<string, ReadingPosition>
}

type LastLearning = {
  href: string
  title: string
  updatedAt: string
}

const props = defineProps<{
  lessonPath: string
  lessonTitle: string
}>()

const POSITION_KEY = 'rec-lab-reading-position-v1'
const LAST_LEARNING_KEY = 'rec-lab-last-learning-v1'
const saved = ref<ReadingPosition | null>(null)
const message = ref('')
let saveTimer: number | undefined
let hasScrolled = false

const canResume = computed(() => Boolean(saved.value && saved.value.scrollY > 160))

function blankStore(): ReadingStore {
  return { version: 1, lessons: {} }
}

function readStore(): ReadingStore {
  try {
    const raw = window.localStorage.getItem(POSITION_KEY)
    if (!raw) return blankStore()
    const value = JSON.parse(raw) as Partial<ReadingStore>
    if (value.version !== 1 || !value.lessons || typeof value.lessons !== 'object') return blankStore()
    return { version: 1, lessons: value.lessons as Record<string, ReadingPosition> }
  } catch {
    return blankStore()
  }
}

function publishLastLearning(href: string, title: string, updatedAt: string) {
  const record: LastLearning = { href, title, updatedAt }
  try {
    window.localStorage.setItem(LAST_LEARNING_KEY, JSON.stringify(record))
    window.dispatchEvent(new CustomEvent('rec-lab:learning-progress', { detail: record }))
  } catch {
    message.value = '「続きから」の位置を保存できませんでした。'
  }
}

function currentHeading() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('.vp-doc h2[id], .vp-doc h3[id]'))
  if (!headings.length) return null

  const readingLine = 112
  let current = headings[0]
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > readingLine) break
    current = heading
  }
  return current
}

function savePosition() {
  if (typeof window === 'undefined' || (!hasScrolled && !window.location.hash)) return
  try {
    const heading = currentHeading()
    const headingId = heading?.id || ''
    const hash = headingId ? `#${encodeURIComponent(headingId)}` : ''
    const href = withBase(`${props.lessonPath}.html${hash}`)
    const headingText = heading?.textContent?.trim() || props.lessonTitle
    const title = `${props.lessonTitle}：${headingText}`
    const updatedAt = new Date().toISOString()
    const position: ReadingPosition = {
      href,
      title,
      heading: headingText,
      scrollY: Math.max(0, Math.round(window.scrollY)),
      updatedAt
    }
    const store = readStore()
    store.lessons[props.lessonPath] = position
    window.localStorage.setItem(POSITION_KEY, JSON.stringify(store))
    saved.value = position
    publishLastLearning(href, title, updatedAt)
  } catch {
    message.value = '読書位置を保存できませんでした。ブラウザの保存設定を確認してください。'
  }
}

function scheduleSave() {
  hasScrolled = true
  window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(savePosition, 500)
}

function resumeReading() {
  const position = saved.value
  if (!position) return
  hasScrolled = true
  try {
    window.history.replaceState(window.history.state, '', position.href)
  } catch {
    // URLを更新できない環境でも、保存したスクロール位置へは戻れる。
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: position.scrollY, behavior: reduceMotion ? 'auto' : 'smooth' })
  publishLastLearning(position.href, position.title, new Date().toISOString())
}

function formatDate(value: string) {
  if (!value || Number.isNaN(Date.parse(value))) return ''
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(value))
}

onMounted(async () => {
  try {
    saved.value = readStore().lessons[props.lessonPath] || null
  } catch {
    message.value = '保存済みの読書位置を読み込めませんでした。'
  }

  await nextTick()
  window.addEventListener('scroll', scheduleSave, { passive: true })
  if (window.location.hash) {
    hasScrolled = true
    window.setTimeout(savePosition, 400)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleSave)
  window.clearTimeout(saveTimer)
  savePosition()
})
</script>

<template>
  <aside v-if="canResume || message" class="lesson-resume" aria-label="前回の続き">
    <template v-if="saved && canResume">
      <div>
        <small>前回の続き・{{ formatDate(saved.updatedAt) }}</small>
        <strong>{{ saved.heading }}</strong>
      </div>
      <button type="button" @click="resumeReading">続きから読む</button>
    </template>
    <p v-if="message" role="status">{{ message }}</p>
  </aside>
</template>

<style scoped>
.lesson-resume {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 26px;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 14px;
  background: var(--vp-c-brand-soft);
}
.lesson-resume div { display: grid; gap: 2px; min-width: 0; }
.lesson-resume small { color: var(--vp-c-text-2); font-size: .78rem; }
.lesson-resume strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.lesson-resume button {
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  color: var(--vp-button-brand-text);
  background: var(--vp-c-brand-1);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}
.lesson-resume p { width: 100%; margin: 0; font-size: .86rem; }
.lesson-resume button:focus-visible { outline: 3px solid var(--vp-c-brand-2); outline-offset: 3px; }
@media (max-width: 520px) {
  .lesson-resume { align-items: stretch; flex-direction: column; }
  .lesson-resume button { width: 100%; }
}
</style>
