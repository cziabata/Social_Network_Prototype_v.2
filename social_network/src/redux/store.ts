import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { appReducer } from "./appReducer";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    profileReducer,
    messagesReducer,
    usersReducer,
    authReducer,
    form: formReducer,
    appReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
type PropertiesType<T> = T extends {[key:string]:infer U} ? U : never
export type InferActionTypes<T extends {[key:string]: (...args:any[])=>any}> = ReturnType<PropertiesType<T>>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.store = store;