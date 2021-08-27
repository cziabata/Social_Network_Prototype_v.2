import { authAPI } from "../api/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
}

let authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export const setAuthData = (email, id, login, isAuth) => ({type: SET_AUTH_DATA, data: {email, id, login, isAuth}});

export const getAuthData = () => {
    return (dispatch) => {
        authAPI.me().then(response => {
            let {email, id, login} = response.data.data;
            if(response.data.resultCode === 0) {
                dispatch(setAuthData(email, id, login, true));
            }
        })
    }
}
export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(getAuthData());
            }
        })
    }
}
export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setAuthData(null, null, null, false))
            }
        })
    }
}

export default authReducer;