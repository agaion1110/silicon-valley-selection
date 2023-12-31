import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from '@/components'
//引入路由
import router from './router/index'
// 引入仓库
import pinia from './store'
// 引入路由鉴权文件
import './permisstion'
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 获取应用的实例对象
const app = createApp(App)
// 安装pinia
app.use(pinia)
//安装自定义插件
app.use(gloalComponent)
// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
});
//注册模板路由
app.use(router)
// 将应用挂载到挂载点上
app.mount('#app')


