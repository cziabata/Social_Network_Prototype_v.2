import { authAPI } from './../api/authAPI';
import { securityAPI } from './../api/securityAPI';
import { ResultCodesEnum } from './../api/api';
import { stopSubmit } from "redux-form";
import { BaseThunkType, InferActionTypes } from './store';

let initialState = {
  email: null as string | null,
  id: null as number | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

let authReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case "SET_AUTH_DATA":
      return {
        ...state,
        ...action.data,
      };
    case "SET_CAPTCHA_URL":
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    default:
      return state;
  }
};

export const actions = {
  setAuthData: (email:string | null, id:number | null, login:string | null, isAuth:boolean) => ({
    type: "SET_AUTH_DATA", data: { email, id, login, isAuth }} as const),
  setCaptchaUrl: (captchaUrl:string) => ({type: "SET_CAPTCHA_URL", captchaUrl} as const),

}

export const getAuthData = ():ThunkType => async (dispatch) => {
  let meData = await authAPI.me();
  let { email, id, login } = meData.data;
  if (meData.resultCode === ResultCodesEnum.Succes) {
    dispatch(actions.setAuthData(email, id, login, true));
  }
};
export const login = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(getAuthData());
  } else {
    if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const logout = ():ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthData(null, null, null, false));
  }
};
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  let captchaUrl = data.url;
  dispatch(actions.setCaptchaUrl(captchaUrl))
}

export default authReducer;
