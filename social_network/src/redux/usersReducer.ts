import { ProfileType } from './profileReducer';
import { PhotosType } from './../types/types';
import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOGGLE_IS_FETCHING = "SET_TOGGLE_IS_FETCHING";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_IS_FOLLOWING_PROGRESS = "SET_IS_FOLLOWING_PROGRESS";

type UserItemType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}
let initialState = {
    users: [] as Array<UserItemType>,
    totalUsersCount: 0,
    pageSize: 20,
    portionSize: 10,
    currentPage: 1,
    isFetching: false,
    userProfile: null,
    isFollowingProgress: [] as Array<number>, // array of users ids
}
type InitialStateType = typeof initialState
 let usersReducer = (state = initialState, action:any):InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.id) {
                        return { ...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.id) {
                        return { ...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOGGLE_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching 
                                     ? [...state.isFollowingProgress, action.userId]
                                     : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
type FollowType = {
    type: typeof FOLLOW,
    id: number
}
export const follow = (id:number):FollowType => ({type: FOLLOW, id});
type UnfollowType = {
    type: typeof UNFOLLOW,
    id: number
}
export const unfollow = (id:number):UnfollowType => ({type: UNFOLLOW, id});
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserItemType>
}
export const setUsers = (users:Array<UserItemType>):SetUsersType => ({type: SET_USERS, users});
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
type SetIsFetchingType = {
    type: typeof SET_TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const setIsFetching = (isFetching:boolean):SetIsFetchingType => ({type: SET_TOGGLE_IS_FETCHING, isFetching});
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    userProfile: ProfileType
}
export const setUserProfile = (userProfile:ProfileType):SetUserProfileType => ({type: SET_USER_PROFILE, userProfile});
type SetFollowingProgressType = {
    type: typeof SET_IS_FOLLOWING_PROGRESS,
    isFetching: boolean, 
    userId: number
}
export const setFollowingProgress = (isFetching:boolean, userId:number):SetFollowingProgressType => ({type: SET_IS_FOLLOWING_PROGRESS, isFetching, userId});


export const getUsers = (pageSize:number, currentPage:number) => async (dispatch:any) => {
       dispatch(setIsFetching(true));
        let data = await usersAPI.getUsers(pageSize, currentPage)
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
}
export const onPageChanged = (pageSize:number, pageNumber:number) => async (dispatch:any) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
        let data = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
}
export const unfollowUser = (userId:number) => async (dispatch:any) => {
        dispatch(setFollowingProgress(true, userId));
        let response = await usersAPI.unfollow(userId)
        if(response.data.resultCode === 0) {
            dispatch(unfollow(userId))
        }
        dispatch(setFollowingProgress(false, userId));
}
export const followUser = (userId:number) => async (dispatch:any) => {
        dispatch(setFollowingProgress(true, userId));
        let response = await usersAPI.follow(userId);
        if(response.data.resultCode === 0) {
            dispatch(follow(userId));
        }
        dispatch(setFollowingProgress(false, userId));
}
export const chooseUserProfile = (userId:number) => async (dispatch:any) => {
        dispatch(setIsFetching(true));
        let response = await usersAPI.getUserProfile(userId);
        dispatch(setIsFetching(false));
        dispatch(setUserProfile(response.data))
}

export default usersReducer;