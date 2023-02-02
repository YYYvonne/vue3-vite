import axios, { type AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
const service = axios.create({
  baseURL: '',
  timeout: 10000,
});
// 请求拦截
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    return Promise.resolve(res);
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default service;