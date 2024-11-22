import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import { useVehicleStore } from '@/stores/vehicle'

// 导入全局样式
import './uni.scss'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  
  // 初始化车辆store
  const vehicleStore = useVehicleStore()
  vehicleStore.init()
  
  return {
    app
  }
}