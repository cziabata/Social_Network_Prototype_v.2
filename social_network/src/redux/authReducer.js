import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_AUTH_DATA = "SET_AUTH_DATA";

let initialState = {
  email: null,
  id: null,
  login: null,
  isAuth: false,
};

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setAuthData = (email, id, login, isAuth) => ({
  type: SET_AUTH_DATA,
  data: { email, id, login, isAuth },
});

export const getAuthData = () => async (dispatch) => {
  let response = await authAPI.me();
  let { email, id, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(email, id, login, true));
  }
};
export const login = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthData());
  } else {
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};
export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(null, null, null, false));
  }
};

export default authReducer;
