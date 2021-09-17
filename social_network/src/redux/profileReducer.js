import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SET_PROFILE = "SET_PROFILE";
const SET_PROFILE_PHOTOS = "SET_PROFILE_PHOTOS";

let initialState = {
  posts: [
    { id: 1, userName: "USER 1", postMessage: "Post Message 111" },
    { id: 2, userName: "USER 2", postMessage: "Post Message 222" },
    { id: 3, userName: "USER 3", postMessage: "Post Message 333" },
  ],
  status: "",
  profile: null,
};

let profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPost = (newMessageBody) => ({type: ADD_POST, newMessageBody});
const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
const setProfile = (profile) => ({type: SET_PROFILE, profile});
const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTOS, photos})

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId); 
    dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const updateProfilePhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photo);
    if(response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}
export const chooseProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getUserProfile(userId);
    dispatch(setProfile(response.data))
}
export const saveProfile = (profile) => async (dispatch, getState) => {
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