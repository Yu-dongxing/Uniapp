import { createSSRApp } from 'vue'
import App from './App'
import SvgIcon from '@/components/SvgIcon.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.component('svg-icon', SvgIcon)
  return {
    app
  }
} 