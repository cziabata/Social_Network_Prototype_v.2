import { PhotosType } from './../types/types';
import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SET_PROFILE = "SET_PROFILE";
const SET_PROFILE_PHOTOS = "SET_PROFILE_PHOTOS";

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

let profileReducer = (state = initialState, action:any):InitialStateType => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, userName: "USER 4", postMessage: action.newMessageBody}],
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter( post => post.id !== action.postId)}
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_PROFILE_PHOTOS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}
type AddPostActionType = {
    type: typeof ADD_POST,
    newMessageBody: string
}
export const addPost = (newMessageBody:string):AddPostActionType => ({type: ADD_POST, newMessageBody});

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
const setStatus = (status:string):SetStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId:number):DeletePostActionType => ({type: DELETE_POST, postId});

type SetProfileActionType = {
    type: typeof SET_PROFILE,
    profile: ProfileType
}
const setProfile = (profile:ProfileType):SetProfileActionType => ({type: SET_PROFILE, profile});

type SetProfilePhotoActionType = {
    type: typeof SET_PROFILE_PHOTOS,
    photos: PhotosType
}
const setProfilePhoto = (photos:PhotosType):SetProfilePhotoActionType => ({type: SET_PROFILE_PHOTOS, photos})

export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId); 
    dispatch(setStatus(response.data));
}
export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const updateProfilePhoto = (photo:any) => async (dispatch:any) => {
    let response = await profileAPI.updatePhoto(photo);
    if(response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}
export const chooseProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getUserProfile(userId);
    dispatch(setProfile(response.data))
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    let userId = getState().authReducer.id;
    let response = await profileAPI.saveProfile(profile);
    if(response.data.resultCode === 0) {
        dispatch(chooseProfile(userId))
    } else {
        dispatch(stopSubmit("profileDataForm", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;