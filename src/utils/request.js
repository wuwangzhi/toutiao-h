import axios from "axios";
export const requset = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})