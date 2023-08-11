// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
import type { loginFormData,loginResponseData,userInfoReponseData } from '@/api/user/type';
// 引入数据类型
import type { UserState } from './types/type'
//引入路由(常量路由)
import { constantRoute, anyRoutes, asyncRoutes } from '@/router/routes'
import router from "@/router";
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          //硅谷333账号:product\trademark\attr\sku
          item.children = filterAsyncRoute(item.children, routes)
        }
        return true
      }
    })
  }

// 创建用户小仓库
let userStore = defineStore('User', {
    // 小仓库的数据存储
    state: (): UserState => {
        return {
            token: localStorage.getItem('token'),//用户的唯一标识存入本地存储
            menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
            username: '',
            avatar: '',
            //存储当前用户是否包含某一个按钮
            buttons: [],
        }
    },
    // 异步|逻辑方法的地方
    actions: {
        // 用户登录的方法
        async login(data: loginFormData): Promise<any> {
            let result: loginResponseData = await reqLogin(data);
            //登录请求:成功200->token
            //登录请求:失败201->登录失败错误的信息
            if (result.code === 200) {
                // pinia仓库存储响应体里返回的token
                this.token = (result.data as string);
                localStorage.setItem('token', this.token);
                return Promise.resolve('登录成功');
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        // 获取用户信息方法
        async userInfo() {
            //获取用户信息进行存储仓库当中[用户头像、名字]
            const result: userInfoReponseData = await reqUserInfo()
            
            //如果获取用户信息成功，存储一下用户信息
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.buttons = result.data.buttons
                let userAsnycRoute = filterAsyncRoute(cloneDeep(asyncRoutes),result.data.routes)//用户需要展示的异步路由
                this.menuRoutes = [...constantRoute, ...userAsnycRoute,...anyRoutes];
                // 对异步路由和任意路由进行注册
                [...userAsnycRoute,...anyRoutes].forEach((route: any) => {
                    router.addRoute(route)
                  })
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录
        async userLogout() {
            //退出登录请求
            const result: any = await reqLogout()
            if (result.code == 200) {
                //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
                this.token = ''
                this.username = ''
                this.avatar = ''
                localStorage.removeItem('token')
                return 'ok'
            } else {
                return Promise.reject(new Error(result))
            }
        },
    },
    getters: {
    }
})
export default userStore;