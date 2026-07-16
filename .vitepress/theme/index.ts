import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent, h } from 'vue'
import StudyProgress from './components/StudyProgress.vue'
import MobileBottomNav from './components/MobileBottomNav.vue'
import './style.css'

const ExamProgress = defineAsyncComponent(() => import('./components/ExamProgress.vue'))
const ExamQuiz = defineAsyncComponent(() => import('./components/ExamQuiz.vue'))
const LearningHome = defineAsyncComponent(() => import('./components/LearningHome.vue'))
const BeginnerGuideComplete = defineAsyncComponent(() => import('./components/BeginnerGuideComplete.vue'))

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(MobileBottomNav)
  }),
  enhanceApp({ app }) {
    app.component('ExamProgress', ExamProgress)
    app.component('ExamQuiz', ExamQuiz)
    app.component('StudyProgress', StudyProgress)
    app.component('LearningHome', LearningHome)
    app.component('BeginnerGuideComplete', BeginnerGuideComplete)
  }
} satisfies Theme
