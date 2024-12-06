import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import { useVehicleStore } from '@/stores/vehicle'
//引入请求文件
import request from './api/request';

// 导入全局样式
import './uni.scss'

export function createApp() {
		const app = createSSRApp(App)
		const pinia = createPinia()
		app.use(pinia)

		// 初始化车辆store
		const vehicleStore = useVehicleStore()
		vehicleStore.init()
		//注册this.$request
		app.config.globalProperties.$request = request
  return {
    app
  }
}