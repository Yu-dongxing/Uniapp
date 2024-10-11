import { createRouter, createWebHistory } from 'vue-router'  
import indexVue from '../pages/index/index.vue'
const routes = [  
    //默认路由
    {
        path:'/',
        redirect:'/MainAbout',
    },
    {
        path:'/MainAbout',
        component:indexVue
    },
    
]  

// 创建路由实例  
const router = createRouter({  
    history: createWebHistory(), // 使用 HTML5 history 模式  
    routes, // 路由配置  
})  
export default router