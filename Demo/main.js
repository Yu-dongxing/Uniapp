import App from './App'
import { createSSRApp } from 'vue'
import request from './api/request';

export function createApp() {
    const app = createSSRApp(App)
	app.config.globalProperties.$request = request
    // 将路由实例附加到 Vue 应用上  
        // app.use(router);  
        // 只返回 Vue 应用实例  
        return {
			app
		};  
}
