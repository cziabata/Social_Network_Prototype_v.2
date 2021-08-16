import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profileReducer,
    messagesReducer,
    usersReducer,
    authReducer
})

export let store = createStore(reducers);