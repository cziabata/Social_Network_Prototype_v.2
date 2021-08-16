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
                isAuth: true,
            }
        default:
            return state
    }
}

export const setAuthData = (email, id, login) => ({type: SET_AUTH_DATA, data: {email, id, login}});

export default authReducer;