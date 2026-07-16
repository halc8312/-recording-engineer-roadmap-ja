<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'

type LastLearning = {
  href: string
  title?: string
  updatedAt?: string
}

const STORAGE_KEY = 'rec-lab-last-learning-v1'
const PROGRESS_EVENT = 'rec-lab:learning-progress'
const route = useRoute()
const lastLearning = ref<LastLearning | null>(null)
const siteBase = withBase('/')

const homeHref = withBase('/')
const progressHref = withBase('/progress.html')
const continueHref = computed(() => lastLearning.value?.href ?? progressHref)
const continueLabel = computed(() =>
  lastLearning.value?.title
    ? `続きから：${lastLearning.value.title}`
    : '続きから（学習ホームを開く）'
)

function normalizePath(path: string) {
  const withoutQuery = path.split(/[?#]/, 1)[0]
  return withoutQuery.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}

const currentPath = computed(() => normalizePath(route.path))
const isHome = computed(() => currentPath.value === '/' || currentPath.value === '/index')
const isProgress = computed(() => currentPath.value === '/progress')
const isContinueTarget = computed(() => {
  if (!lastLearning.value || isHome.value || isProgress.value) return false
  return normalizePath(lastLearning.value.href) === currentPath.value
    || normalizePath(stripSiteBase(lastLearning.value.href)) === currentPath.value
})

function stripSiteBase(href: string) {
  if (siteBase !== '/' && href.startsWith(siteBase)) {
    return `/${href.slice(siteBase.length)}`
  }
  return href
}

function safeInternalHref(value: unknown) {
  if (typeof value !== 'string') return null
  const href = value.trim()
  if (!href.startsWith('/') || href.startsWith('//') || href.includes('\\')) return null

  const expanded = siteBase !== '/' && href.startsWith(siteBase)
    ? href
    : withBase(href)

  try {
    const url = new URL(expanded, window.location.origin)
    if (url.origin !== window.location.origin) return null
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

function readLastLearning() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      lastLearning.value = null
      return
    }

    let value: unknown
    try {
      value = JSON.parse(raw) as unknown
    } catch {
      value = raw
    }

    const candidate = typeof value === 'string'
      ? { href: value }
      : value && typeof value === 'object'
        ? value as Partial<LastLearning>
        : null
    const href = safeInternalHref(candidate?.href)
    if (!href) {
      lastLearning.value = null
      return
    }

    lastLearning.value = {
      href,
      title: typeof candidate?.title === 'string' ? candidate.title.slice(0, 120) : undefined,
      updatedAt: typeof candidate?.updatedAt === 'string' ? candidate.updatedAt : undefined
    }
  } catch {
    lastLearning.value = null
  }
}

function isTrackableLearningPage(path: string) {
  const normalized = normalizePath(stripSiteBase(path))
  return normalized.startsWith('/lessons/')
    || normalized.startsWith('/practice/')
    || /^\/exam\/0[1-7]-/.test(normalized)
    || [
      '/exam/quick-reference',
      '/exam/glossary',
      '/exam/mock-exam',
      '/exam/beginner-guide',
      '/exam/start-here'
    ].includes(normalized)
}

function pageTitle() {
  const heading = document.querySelector<HTMLElement>('main h1, .VPContent h1')?.textContent?.trim()
  if (heading) return heading
  return document.title.split(' | ')[0]?.trim() || '前回の学習'
}

function recordCurrentPage() {
  const logicalPath = stripSiteBase(route.path)
  if (!isTrackableLearningPage(logicalPath)) return

  const expandedPath = safeInternalHref(
    `${logicalPath}${window.location.search}${window.location.hash}`
  )
  if (!expandedPath) return

  const entry: LastLearning = {
    href: expandedPath,
    title: pageTitle(),
    updatedAt: new Date().toISOString()
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
    lastLearning.value = entry
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: entry }))
  } catch {
    // 保存できない環境でも、ナビゲーション自体は利用できる。
    lastLearning.value = entry
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY) readLastLearning()
}

function handleProgressEvent() {
  readLastLearning()
}

function openSearch() {
  const trigger = document.querySelector<HTMLButtonElement>(
    '#local-search .DocSearch-Button, .VPNavBarSearch button[aria-label*="検索"]'
  )
  if (trigger && !trigger.disabled) {
    trigger.click()
    return
  }

  // VitePress側のマークアップが変わった場合は、公式ショートカットを使う。
  const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent)
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    metaKey: isApple,
    ctrlKey: !isApple,
    bubbles: true,
    cancelable: true
  }))
}

onMounted(() => {
  readLastLearning()
  window.addEventListener('storage', handleStorage)
  window.addEventListener(PROGRESS_EVENT, handleProgressEvent)
  window.addEventListener('hashchange', recordCurrentPage)
  nextTick(recordCurrentPage)
})

watch(
  () => route.path,
  () => nextTick(recordCurrentPage),
  { flush: 'post' }
)

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorage)
  window.removeEventListener(PROGRESS_EVENT, handleProgressEvent)
  window.removeEventListener('hashchange', recordCurrentPage)
})
</script>

<template>
  <nav class="mobile-bottom-nav" aria-label="スマートフォン用メインナビゲーション">
    <a :href="homeHref" :class="{ active: isHome }" :aria-current="isHome ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></svg>
      <span>ホーム</span>
    </a>
    <a
      :href="continueHref"
      :class="{ active: isContinueTarget }"
      :aria-current="isContinueTarget ? 'page' : undefined"
      :aria-label="continueLabel"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5v14l14-7Z" /></svg>
      <span>続きから</span>
    </a>
    <a :href="progressHref" :class="{ active: isProgress }" :aria-current="isProgress ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2" /></svg>
      <span>進捗</span>
    </a>
    <button type="button" aria-label="教材を検索" @click="openSearch">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
      <span>検索</span>
    </button>
  </nav>
</template>

<style scoped>
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 767px) {
  :global(:root) {
    --rec-mobile-nav-bar-height: 64px;
    --rec-mobile-nav-height: calc(var(--rec-mobile-nav-bar-height) + env(safe-area-inset-bottom, 0px));
  }

  :global(.Layout) {
    padding-bottom: var(--rec-mobile-nav-height);
  }

  .mobile-bottom-nav {
    position: fixed;
    z-index: 60;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    min-height: var(--rec-mobile-nav-height);
    padding: 4px max(4px, env(safe-area-inset-right, 0px)) env(safe-area-inset-bottom, 0px) max(4px, env(safe-area-inset-left, 0px));
    border-top: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
    box-shadow: 0 -8px 24px rgb(15 23 42 / 10%);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .mobile-bottom-nav a,
  .mobile-bottom-nav button {
    display: grid;
    min-width: 0;
    min-height: 56px;
    place-content: center;
    place-items: center;
    gap: 2px;
    padding: 3px 2px;
    border: 0;
    border-radius: 10px;
    color: var(--vp-c-text-2);
    background: transparent;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    cursor: pointer;
  }

  .mobile-bottom-nav a.active {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
  }

  .mobile-bottom-nav a:focus-visible,
  .mobile-bottom-nav button:focus-visible {
    outline: 3px solid var(--vp-c-brand-2);
    outline-offset: -3px;
  }

  .mobile-bottom-nav svg {
    width: 23px;
    height: 23px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .mobile-bottom-nav a:nth-child(2) svg {
    fill: currentColor;
    stroke: none;
  }

  :global(.dark) .mobile-bottom-nav {
    background: var(--vp-c-bg);
    background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
    box-shadow: 0 -8px 24px rgb(0 0 0 / 32%);
  }
}

@media (max-width: 359px) {
  .mobile-bottom-nav a,
  .mobile-bottom-nav button {
    font-size: 11px;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .mobile-bottom-nav {
    background: var(--vp-c-bg);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

@media print {
  .mobile-bottom-nav {
    display: none !important;
  }
}
</style>
