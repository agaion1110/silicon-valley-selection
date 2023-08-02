// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin } from "@/api/user";
// 引入数据类型
import type { loginForm, loginResponseData } from "@/api/user/type";
import type { UserState } from './types/type'
//引入路由(常量路由)
import { constantRoute } from '/src/router/index'
// 创建用户小仓库
let userStore = defineStore('User', {
    // 小仓库的数据存储
    state: ():UserState => {
        return {
            token: localStorage.getItem('token'),//用户的唯一标识存入本地存储
            menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
        }
    },
    // 异步|逻辑方法的地方
    actions: {
        // 用户登录的方法
        async login(data: loginForm): Promise<any> {
            let result:loginResponseData = await reqLogin(data);
            //登录请求:成功200->token
            //登录请求:失败201->登录失败错误的信息
            if (result.code === 200) {
                // pinia仓库存储响应体里返回的token
                this.token = (result.data.token as string);
                localStorage.setItem('token', JSON.stringify(result.data.token));
                return Promise.resolve('登录成功');
            } else {
                return Promise.reject(new Error(result.data.message)); 
            }
        }
    },
    getters: {
    }
})
export default userStore;