import { profileAPI } from './../api/profileAPI';
import { usersAPI } from './../api/usersAPI';
import { PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { InferActionTypes, BaseThunkType } from './store';

type InitialStatePostItemType = {
    id: number,
    userName: string,
    postMessage: string
}
type ContactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null,
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: ContactsType,
    photos: PhotosType
}
let initialState = {
  posts: [
    { id: 1, userName: "USER 1", postMessage: "Post Message 111" },
    { id: 2, userName: "USER 2", postMessage: "Post Message 222" },
    { id: 3, userName: "USER 3", postMessage: "Post Message 333" },
  ] as Array<InitialStatePostItemType>,
  status: "",
  profile: null as ProfileType | null,
};

type InitialStateType = typeof initialState
export const actions = {
    addPost: (newMessageBody:string) => ({type: "ADD_POST", newMessageBody} as const),
    setStatus: (status:string) => ({type: "SET_STATUS", status} as const),
    deletePost: (postId:number) => ({type: "DELETE_POST", postId} as const),
    setProfile: (profile:ProfileType) => ({type: "SET_PROFILE", profile} as const),
    setProfilePhoto: (photos:PhotosType) => ({type: "SET_PROFILE_PHOTOS", photos} as const)
}
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

let profileReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch(action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, {id: 4, userName: "USER 4", postMessage: action.newMessageBody}],
            };
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "DELETE_POST":
            return { ...state, posts: state.posts.filter( post => post.id !== action.postId)}
        case "SET_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET_PROFILE_PHOTOS":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId); 
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const updateProfilePhoto = (photo:File):ThunkType => async (dispatch) => {
    let data = await profileAPI.updatePhoto(photo);
    if(data.resultCode === 0) {
        dispatch(actions.setProfilePhoto(data.data))
    }
}
export const chooseProfile = (userId:number):ThunkType => async (dispatch) => {
    let data = await usersAPI.getUserProfile(userId);
    dispatch(actions.setProfile(data))
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    let userId = getState().authReducer.id;
    let response = await profileAPI.saveProfile(profile);
    if(response.data.resultCode === 0) {
        if(userId !== null){
            dispatch(chooseProfile(userId))
        } else {
            throw new Error("user id can't be null")
        }
    } else {
        dispatch(stopSubmit("profileDataForm", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;