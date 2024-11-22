import { createSSRApp } from 'vue'
import App from './App'
import SvgIcon from '@/components/SvgIcon.vue'
import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js'

export function createApp() {
  const app = createSSRApp(App)
  app.component('svg-icon', SvgIcon)
  app.config.globalProperties.$uCharts = uCharts
  return {
    app
  }
} 