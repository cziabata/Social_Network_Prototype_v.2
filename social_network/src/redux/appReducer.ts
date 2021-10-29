import { getAuthData } from "./authReducer";

const SET_INITIALIZED_SUCCESS = "appReducer/SET_INITIALIZED_SUCCESS";

export type InitialStateType = typeof initialState
let initialState = {
    initialized: false
}

export let appReducer = (state = initialState, action: any):InitialStateType => {
    switch(action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS // "SET_INITIALIZED_SUCCESS"
}

export const initializedSuccess = ():InitializedSuccessActionType  => ({type: SET_INITIALIZED_SUCCESS});
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthData());
    Promise.all([promise]).then( () => dispatch(initializedSuccess()))
}