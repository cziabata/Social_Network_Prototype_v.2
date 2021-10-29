import { ProfileType } from './../redux/profileReducer';
import { GetUserItemsType, instance, ResponseType } from './api';

export const usersAPI = {
    getUsers(pageSize:number, currentPage:number){
       return instance.get<GetUserItemsType>(`users?count=${pageSize}&page=${currentPage}`).then(
            response => { return response.data }
        )
    },
    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
    follow(userId:number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    getUserProfile(userId:number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res=>res.data)
    }
}