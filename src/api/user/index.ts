// 统一管理用户相关的接口
import request from '@/utils/request';
import type { loginForm,loginResponseData,userResponseData } from './type';
// 统一管理接口
enum API{
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
    LOGOUT_URL = '/user/logout',
}
// 对外暴露请求函数
// 登录接口
export const reqLogin = (data: loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口
export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)