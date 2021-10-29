import { instance, MeResponseData, LoginResponseData, ResponseType } from './api';

export const authAPI = {
    me(){
        return instance.get<ResponseType<MeResponseData>>(`auth/me`).then(response => response.data);
    },
    login(email:string, password:string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseData>>(`auth/login`, {email, password, rememberMe, captcha}).then(response=>response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}