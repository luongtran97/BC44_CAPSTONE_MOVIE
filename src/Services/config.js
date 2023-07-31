import axios from "axios";
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
    Authorization:renderAccessToken(),
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NCIsIkhldEhhblN0cmluZyI6IjA5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjA4MDAwMDAwMCIsIm5iZiI6MTY3MjQxOTYwMCwiZXhwIjoxNzAyMjI3NjAwfQ.P5fJSMdFWDXkAXi_Hm7kZhuXoxo6xtTzIno_q6kp38I",
  },
});
