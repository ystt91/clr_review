import axios from "axios";
import {getCookie, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";


const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST

    const header = {header:{"Authorization" : `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log(res.data) // new accesstoken / new refreshtoken

    return res.data

}

const beforeReq = (config) => {

    console.log("before request..............")

    const memberInfo = getCookie("member");

    if(!memberInfo){
        console.log("Member NOT FOUND")
        return Promise.reject(
            {response:
                    {data:{
                        error:"REQUIRED_LOGIN"
                        }}
                    }
        )
    }

    return config

}

const beforeRes = async (res) => {

    console.log("before return response..............")

    const data = res.data

    if(data && data.error === 'ERROR_ACCESS_TOKEN'){

        const memberCookieValue = getCookie("member")

        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        // 새로운 accessToken, refreshToken
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie('member', JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config

        console.log(originalRequest)

        originalRequest.headers.Authorization = `Bearer ${memberCookieValue.accessToken}`

        return await axios(originalRequest)

    }

    return res

}

const requestFail = (err) => {

    console.log("request error..............")


    return Promise.reject(err)

}



const responseFail = (err) => {

    console.log("response fail error..............")



    return Promise.reject(err)

}


jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios