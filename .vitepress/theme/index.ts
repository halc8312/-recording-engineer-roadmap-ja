import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import StudyProgress from './components/StudyProgress.vue'
import './style.css'

const ExamProgress = defineAsyncComponent(() => import('./components/ExamProgress.vue'))
const ExamQuiz = defineAsyncComponent(() => import('./components/ExamQuiz.vue'))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ExamProgress', ExamProgress)
    app.component('ExamQuiz', ExamQuiz)
    app.component('StudyProgress', StudyProgress)
  }
} satisfies Theme
