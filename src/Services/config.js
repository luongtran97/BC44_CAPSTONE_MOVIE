import axios from "axios";
import { store } from "..";
import { batLoading,tatLoading } from "../redux/sipnnerSlice";
import { LocalStoreService } from "./LocalStoreService";


let dataLocal = LocalStoreService.getItem("USER_LOGIN")


const renderAccessToken = () => {
  if (dataLocal !== null) {
    return ` Bearer ${dataLocal.accessToken}`;
  }

};

export let https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/",
  headers: {
    Authorization: renderAccessToken(),
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NCIsIkhldEhhblN0cmluZyI6IjA5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjA4MDAwMDAwMCIsIm5iZiI6MTY3MjQxOTYwMCwiZXhwIjoxNzAyMjI3NjAwfQ.P5fJSMdFWDXkAXi_Hm7kZhuXoxo6xtTzIno_q6kp38I",
  },
});

// Interceptor Axios

// Add a request interceptor
https.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch(batLoading())

  console.log("go");
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
https.interceptors.response.use(function (response) {
  console.log("back");
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch(tatLoading())
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});