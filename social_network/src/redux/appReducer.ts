import { getAuthData } from "./authReducer";
import { InferActionTypes } from "./store";

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

let initialState = {
    initialized: false
}

export let appReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch(action.type) {
        case "appReducer/SET_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: "appReducer/SET_INITIALIZED_SUCCESS"} as const)
}
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthData());
    Promise.all([promise]).then( () => dispatch(actions.initializedSuccess()))
}