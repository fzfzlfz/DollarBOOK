import axios from 'axios'
import { getToken } from './token';

const http = axios.create({
  baseURL: 'https://635e811e03d2d4d47af02b61.mockapi.io/api/v1/',
  timeout: 5000
})

// request interceptor
http.interceptors.request.use((config)=> {
    // if not login-->add token
    const token = getToken();
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { http }