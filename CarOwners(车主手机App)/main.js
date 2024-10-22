import App from './App'
import { createSSRApp } from 'vue'
//引入请求文件
import Request from './api/request.js';
import Login from'./api/login/login.js';
export function createApp() {
	const app = createSSRApp(App)
	//注册this.$request
	// app.config.globalProperties.$request = Request
	app.config.globalProperties.$request = Request;
	app.config.globalProperties.$login = Login;
	// 只返回 Vue 应用实例  
	return {
		app
	};  
}
