import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profileReducer,
    messagesReducer,
    usersReducer,
})

export let store = createStore(reducers);