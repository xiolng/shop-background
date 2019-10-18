import axios from "axios"
import {message} from 'antd'
import {openUrl} from "@/utils/config"

axios.interceptors.request.use(
    config => {
        const links = window.location
        const token = localStorage.getItem('token')
        if (!token && (links.search.indexOf('tgtId') <= -1) && (links.pathname !== '/login')) {
            // console.log('没有token，没有sso请求参数，不是登录页')
            const links = window.location.origin
            // openUrl({
            //     status: "login",
            //     links
            // })
            return false
        }
        // console.log(config);
        config.headers.Authorization = token
        return config
    },
    error => {
        // console.log(error)
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        // console.log(111, response);
        return response
    },
    error => {
        // message.error(error.response.data.message)
        // console.log(222, error.response)
        // if (error.response.status === 401) {
        //     localStorage.clear()
        //     const links = window.location.origin
        //     // openUrl({
        //     //     status: "login",
        //     //     links
        //     // })
        // }
        return Promise.reject(error)
    }
)

export default axios
