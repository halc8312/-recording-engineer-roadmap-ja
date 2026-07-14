import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import StudyProgress from './components/StudyProgress.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StudyProgress', StudyProgress)
  }
} satisfies Theme
