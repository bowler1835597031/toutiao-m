//引入axios
import store from '@/store'
import axios from 'axios'
//配置axios的默认配置
//创建一个全新的axios对象，克隆
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
//拦截器
//请求拦截器：每次请求都会执行的函数
//响应拦截器：每一个请求响应回来时，都会执行的函数
request.interceptors.request.use(
  //想在发送请求前做什么
  //config本次请求的配置
  //必须要返回出去
  (config) => {
    // console.log(config)
    // config添加token
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  //请求错误时 处理的方法
  (error) => {
    return Promise.reject(error)
  }
)

export default request
