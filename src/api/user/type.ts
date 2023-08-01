// 登录接口需要携带的参数ts类型
export interface loginForm {
    username: string;
    password: string;
}
interface dataType{
    token: string;
}
export interface loginResponseData { 
    code: number,
    data: dataType
}
interface userInfo{
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}
// 定义服务器返回会的用户信息相关的数据类型
interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number,
    data: user
}