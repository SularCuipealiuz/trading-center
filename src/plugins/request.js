import axios from "axios";
import {getToken} from "@/plugins/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const url = new URL(location.href)
    if (url.searchParams.get('token') !== null) {
      sessionStorage.setItem('token', url.searchParams.get('token'));
      config.headers["token"] = "Bearer " + url.searchParams.get('token')
    } else if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined) {
      config.headers["token"] = "Bearer " + sessionStorage.getItem('token')
    } else if (getToken() !== undefined && getToken() !== null) {
      config.headers["token"] = "Bearer " + getToken();
    }

    config.headers["Authorization"] =
      "Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=";
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    let isCaptcha = false;

    if (response.config.url === "/api/oauth/anno/captcha") {
      isCaptcha = true;
    }

    if (isCaptcha) {
      return res;
    }

    if (res.code !== 0) {
      // if (res.code === 40001) {
      //   store.dispatch("doLogout").then(res => {
      //     console.log("res", res);
      //   });
      // }

      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res.data;
    }
  },
  error => {
    console.log("Request Error:" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
