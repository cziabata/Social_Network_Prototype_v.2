import { PhotosType } from '../types/types';
import { ProfileType } from './../redux/profileReducer';
import { instance, ResponseType } from './api';

export const profileAPI = {
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(res=>res.data)
    },
    updatePhoto(photo:any) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put<ResponseType<PhotosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }).then(res=>res.data)
    },
    saveProfile(profile:ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
} 