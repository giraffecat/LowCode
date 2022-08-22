// 对axios进行二次封装
import axios from "axios"


const requests = axios.create({
    // 基础路径
    baseURL: "/api",
    // 请求不能超过5秒
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    return config;
})

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        alert("服务器响应数据失败");
    }
)

export default requests


