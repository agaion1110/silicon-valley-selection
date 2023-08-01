import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from '@/components'
// 获取应用的实例对象
const app = createApp(App)
//安装自定义插件
app.use(gloalComponent)
// 安装element-plus插件
app.use(ElementPlus);
// 将应用挂载到挂载点上
app.mount('#app')

// 测试代码：测试假的接口是否能用
// import axios from 'axios'
// // 登录接口
// axios({
//     url: '/api/user/login',
//     method: 'post',
//     data: {
//         username: 'admin',
//         passwprd: '111111'
//     }
// })

