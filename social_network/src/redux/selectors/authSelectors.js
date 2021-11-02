export const selectIsAuth = (state) => {
    return state.authReducer.isAuth;
}
export const selectCurrentUserLogin = (state) => {
    return state.authReducer.login;
}