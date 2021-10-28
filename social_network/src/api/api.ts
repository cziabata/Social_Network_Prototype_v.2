import { ProfileType } from './../redux/profileReducer';
import axios from "axios";

let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "6847b8b0-6480-41e7-80b9-70115535fc82"
    }
})

export const usersAPI = {
    getUsers(pageSize:number, currentPage:number){
       return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(
            response => { return response.data }
        )
    },
    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`)
    },
    follow(userId:number) {
        return instance.post(`follow/${userId}`)
    },
    getUserProfile(userId:number) {
        return instance.get(`profile/` + userId)
    }
}
export enum ResultCodesEnum {
    Succes = 0,
    Error = 1
}
export enum ResultCodesCaptcha {
    CaptchaIsRequired = 10
}
type MeResponseData = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseData = {
    data: {
        id: number
    }
    resultCode: ResultCodesEnum | ResultCodesCaptcha
    messages: Array<string>
}
export const authAPI = {
    me(){
        return instance.get<MeResponseData>(`auth/me`).then(response => response.data);
    },
    login(email:string, password:string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseData>(`auth/login`, {email, password, rememberMe, captcha}).then(response=>response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const profileAPI = {
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    updatePhoto(photo:any) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    },
    saveProfile(profile:ProfileType) {
        return instance.put(`profile`, profile)
    }
} 
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}  