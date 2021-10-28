import { ResultCodesEnum, ResultCodesCaptcha } from './../api/api';
import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState = {
  email: null,
  id: null,
  login: null,
  isAuth: false,
  captchaUrl: null
};

export type InitialStateType = {
  email: null | string,
  id: null | number,
  login: null | string,
  isAuth: boolean,
  captchaUrl: null | string
}

let authReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    default:
      return state;
  }
};

type UserDataType = {
  email:string | null, 
  id:number | null, 
  login:string | null, 
  isAuth:boolean | null
}
type SetAuthDataType = {
  type: typeof SET_AUTH_DATA,
  data: UserDataType
}
export const setAuthData = (email:string | null, id:number | null, login:string | null, isAuth:boolean):SetAuthDataType => ({
  type: SET_AUTH_DATA,
  data: { email, id, login, isAuth },
});

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL,
  captchaUrl: string,
}
const setCaptchaUrl = (captchaUrl:string):SetCaptchaUrlType => ({type: SET_CAPTCHA_URL, captchaUrl})

export const getAuthData = () => async (dispatch:any) => {
  let meData = await authAPI.me();
  let { email, id, login } = meData.data;
  if (meData.resultCode === ResultCodesEnum.Succes) {
    dispatch(setAuthData(email, id, login, true));
  }
};
export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthData());
  } else {
    if (data.resultCode === ResultCodesCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const logout = () => async (dispatch:any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(null, null, null, false));
  }
};
export const getCaptchaUrl = () => async (dispatch:any) => {
  let response = await securityAPI.getCaptchaUrl();
  let captchaUrl = response.data.url;
  dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;
