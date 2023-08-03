// 进行axios二次封装：请求与相应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus'
import userStore from '../store/modules/user';
// 第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
let request = axios.create({
  // 基础路径
  //headers: {name: 'zw666'},
  baseURL: '/api',
  timeout: 5000,//超时的时间设置
});
// 第二步：request实例添加请求与响应拦截器(interceptors:拦截器)
request.interceptors.request.use((config) => {
  //console.log(config)
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  const user = userStore()
  if (user.token) {
    config.headers.token = user.token
  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  // 返回配置对象
  return config;
});
//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request;