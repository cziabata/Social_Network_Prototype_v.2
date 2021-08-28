import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { appReducer } from "./appReducer";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    profileReducer,
    messagesReducer,
    usersReducer,
    authReducer,
    form: formReducer,
    appReducer,
})

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;