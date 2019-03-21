/*
 * Create by wangsw on 2019-02-19
 */
import axios from "axios";
import store from "../store";
import { toast, alertDialog } from "../api/client/tools";
// 创建axios实例
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_API_URL
      : "/api", // api 的
  withCredentials: false,
  timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (!store.getters.baseInfo) {
      store.dispatch("getBaseInfo");
    }
    // 添加默认公共请求参数
    if (config.hasOwnProperty("params")) {
      config.params = {
        ...store.getters.baseInfo,
        ...config.params
      };
    } else if (config.hasOwnProperty("data")) {
      config.data = {
        ...store.getters.baseInfo,
        ...config.data
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.result_code === 200) {
      return data;
    } else if (data.result_code === 401 || data.result_code === 400) {
      store.dispatch("initBaseInfo");
      return false;
    } else {
      alertDialog(
        "This page is too busy, but don't worry, SHAREit developers are doing their best to solve it. Please try again later.",
        "Network Error",
        "alertCallback",
        true
      );
      return false;
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

window.alertCallback = function(text) {
  toast(text);
};
export default service;
