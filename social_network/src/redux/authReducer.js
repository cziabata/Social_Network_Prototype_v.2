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

let authReducer = (state = initialState, action) => {
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

export const setAuthData = (email, id, login, isAuth) => ({
  type: SET_AUTH_DATA,
  data: { email, id, login, isAuth },
});
const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl})

export const getAuthData = () => async (dispatch) => {
  let response = await authAPI.me();
  let { email, id, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(email, id, login, true));
  }
};
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(null, null, null, false));
  }
};
export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  let captchaUrl = response.data.url;
  dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;
