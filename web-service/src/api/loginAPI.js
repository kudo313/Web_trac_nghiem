import { DateSchema } from "yup";
import axiosClient from "./baseAPI"
//  const BASE_URL="http://0.0.0.0:8000"

//  export default {
//      BASE_URL,
//      LOGIN: "http://0.0.0.0:8000/login"
//  }

const loginAPI = {
    login: (data) => {
        const url = '/login';
        return axiosClient.post(url, data);
    },
    logoff: (data) => {
        const url = '/sign_off';
        return axiosClient.post(url, data= data);
    }
}


export default loginAPI;

