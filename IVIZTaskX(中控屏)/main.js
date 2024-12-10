import App from './App'
import { createSSRApp } from 'vue'
//引入请求文件
import request from './api/request';
import store from './store.js' // 在最顶部引入vuex

export function createApp() {
  const app = createSSRApp(App)
  
  app.config.globalProperties.$request = request;
  app.use(store);
  return {
    app
  }
}
