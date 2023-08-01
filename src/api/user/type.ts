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