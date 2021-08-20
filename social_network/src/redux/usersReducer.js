import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOGGLE_IS_FETCHING = "SET_TOGGLE_IS_FETCHING";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_IS_FOLLOWING_PROGRESS = "SET_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: false,
    userProfile: null,
    isFollowingProgress: [],
}
 let usersReducer = (state = initialState, action) => {
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

export const follow = (id) => ({type: FOLLOW, id});
export const unfollow = (id) => ({type: UNFOLLOW, id});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const setIsFetching = (isFetching) => ({type: SET_TOGGLE_IS_FETCHING, isFetching});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setFollowingProgress = (isFetching, userId) => ({type: SET_IS_FOLLOWING_PROGRESS, isFetching, userId});

export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
       dispatch(setIsFetching(true));
        usersAPI.getUsers(pageSize, currentPage).then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            }
        )
    }
}
export const onPageChanged = (pageSize, pageNumber) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
        usersAPI.getUsers(pageSize, pageNumber).then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            }
        )
    }
}
export const unfollowUser = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, userId));
        usersAPI.unfollow(userId).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(unfollow(userId))
            }
            dispatch(setFollowingProgress(false, userId));
        }
      )
    }
}
export const followUser = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingProgress(true, userId));
        usersAPI.follow(userId).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(follow(userId));
            }
            dispatch(setFollowingProgress(false, userId));
        }
      )    
    }
}
export const chooseUserProfile = (userId) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUserProfile(userId).then( response => {
            dispatch(setIsFetching(false));
            dispatch(setUserProfile(response.data))
        })
    }
}

export default usersReducer;