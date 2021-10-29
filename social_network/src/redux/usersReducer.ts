import { usersAPI } from './../api/usersAPI';
import { ProfileType } from './profileReducer';
import { UserItemType } from './../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionTypes } from './store';
import { Action } from 'redux';

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
type ActionsType = InferActionTypes<typeof actions>

let usersReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch(action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.id) {
                        return { ...user, followed: true}
                    }
                    return user;
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.id) {
                        return { ...user, followed: false}
                    }
                    return user;
                })
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET_TOGGLE_IS_FETCHING": 
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_USER_PROFILE":
            return {
                ...state,
                //@ts-ignore
                userProfile: action.userProfile
            }
        case "SET_IS_FOLLOWING_PROGRESS":
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
let actions = {
    follow: (id:number) => ({type: "FOLLOW", id} as const),
    unfollow: (id:number) => ({type: "UNFOLLOW", id} as const),
    setUsers: (users:Array<UserItemType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage:number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalUsersCount:number) => ({type: "SET_TOTAL_USERS_COUNT", totalUsersCount} as const),
    setIsFetching: (isFetching:boolean) => ({type: "SET_TOGGLE_IS_FETCHING", isFetching} as const),
    setUserProfile: (userProfile:ProfileType) => ({type: "SET_USER_PROFILE", userProfile} as const),
    setFollowingProgress: (isFetching:boolean, userId:number) => ({type: "SET_IS_FOLLOWING_PROGRESS", isFetching, userId} as const),
}


type ThunkActionCreatorType = ThunkAction<Promise<void>, AppStateType, unknown, Action<string>>
export const getUsers = (pageSize:number, currentPage:number):ThunkActionCreatorType => async (dispatch:any) => {
       dispatch(actions.setIsFetching(true));
        let data = await usersAPI.getUsers(pageSize, currentPage)
                dispatch(actions.setIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount));
}
export const onPageChanged = (pageSize:number, pageNumber:number):ThunkActionCreatorType => async (dispatch:any) => {
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        let data = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
}
export const unfollowUser = (userId:number):ThunkActionCreatorType => async (dispatch:any) => {
        dispatch(actions.setFollowingProgress(true, userId));
        let data = await usersAPI.unfollow(userId)
        if(data.resultCode === 0) {
            dispatch(actions.unfollow(userId))
        }
        dispatch(actions.setFollowingProgress(false, userId));
}
export const followUser = (userId:number):ThunkActionCreatorType => async (dispatch:any) => {
        dispatch(actions.setFollowingProgress(true, userId));
        let data = await usersAPI.follow(userId);
        if(data.resultCode === 0) {
            dispatch(actions.follow(userId));
        }
        dispatch(actions.setFollowingProgress(false, userId));
}
export const chooseUserProfile = (userId:number):ThunkActionCreatorType => async (dispatch:any) => {
        dispatch(actions.setIsFetching(true));
        let data = await usersAPI.getUserProfile(userId);
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUserProfile(data))
}

export default usersReducer;