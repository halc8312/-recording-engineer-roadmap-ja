<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const GUIDE_KEY = 'rec-lab-japrs-beginner-guide-v1'
const LAST_LEARNING_KEY = 'rec-lab-last-learning-v1'
const target = '/exam/01-acoustics-hearing.html#week-1-start'
const completed = ref(false)

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(GUIDE_KEY)
    if (!raw) return
    const stored = JSON.parse(raw) as { completedAt?: unknown }
    completed.value = typeof stored.completedAt === 'string'
  } catch {
    completed.value = false
  }
})

function finishGuide() {
  const now = new Date().toISOString()
  completed.value = true
  try {
    window.localStorage.setItem(GUIDE_KEY, JSON.stringify({ version: 1, completedAt: now }))
    window.localStorage.setItem(LAST_LEARNING_KEY, JSON.stringify({
      href: withBase(target),
      title: 'Week 1：音の三要素と波',
      updatedAt: now
    }))
    window.dispatchEvent(new CustomEvent('rec-lab:learning-progress'))
  } catch {
    // 保存できない環境でも、リンク先の教材はそのまま開ける。
  }
}
</script>

<template>
  <section class="guide-finish" aria-labelledby="guide-finish-title">
    <span aria-hidden="true">✓</span>
    <div>
      <p>準備完了</p>
      <h2 id="guide-finish-title">今日はWeek 1の最初の節だけ</h2>
      <p>「客観的な音」と「主観的な音」を読み、理解確認1まで進めます。目安は10分です。</p>
      <a :href="withBase(target)" @click="finishGuide">
        {{ completed ? 'Week 1の続きへ' : 'ガイドを完了してWeek 1へ' }}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.guide-finish {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: start;
  margin: 30px 0;
  padding: clamp(20px, 5vw, 30px);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 18px;
  background: var(--vp-c-brand-soft);
}

.guide-finish > span {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  color: var(--vp-button-brand-text, #fff);
  background: var(--vp-c-brand-1);
  font-size: 1.1rem;
  font-weight: 900;
}

.guide-finish p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.guide-finish div > p:first-child {
  color: var(--vp-c-brand-1);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .1em;
}

.guide-finish h2 {
  margin: 3px 0 8px;
  border: 0;
  font-size: clamp(1.25rem, 4vw, 1.55rem);
}

.guide-finish a {
  display: inline-flex;
  min-height: 48px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  padding: 0 19px;
  border-radius: 999px;
  color: var(--vp-button-brand-text, #fff);
  background: var(--vp-c-brand-1);
  font-weight: 800;
  text-decoration: none;
}

.guide-finish a:hover {
  background: var(--vp-c-brand-2);
}

.guide-finish a:focus-visible {
  outline: 3px solid var(--vp-c-brand-2);
  outline-offset: 3px;
}

@media (max-width: 520px) {
  .guide-finish {
    grid-template-columns: 1fr;
  }

  .guide-finish a {
    width: 100%;
  }
}
</style>
