import axios from "axios";
import { UserItemType } from "../types/types";

export let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "6847b8b0-6480-41e7-80b9-70115535fc82"
    }
})
export enum ResultCodesEnum {
    Succes = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
/*export enum ResultCodesCaptcha {
    CaptchaIsRequired = 10
}*/
export type ResponseType<D={}, RC=ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
export type MeResponseData = {
    id: number
    email: string
    login: string
}
export type LoginResponseData = {
    id: number
} 
export type GetUserItemsType = {
    items: Array<UserItemType>
    totalCount: number
    error: string | null
}