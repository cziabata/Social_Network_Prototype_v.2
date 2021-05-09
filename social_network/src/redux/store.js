import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";

let reducers = combineReducers({
    profileReducer,
    messagesReducer,
})

export let store = createStore(reducers);