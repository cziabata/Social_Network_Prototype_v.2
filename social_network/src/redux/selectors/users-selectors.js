export const getAllUsers = (state) => {
    return state.usersReducer.users;
}
export const getTotalUsersCount = (state) => {
    return state.usersReducer.totalUsersCount;
}
export const getPageSize = (state) => {
    return state.usersReducer.pageSize;
}
export const getCurrentPage = (state) => {
    return state.usersReducer.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersReducer.isFetching;
}
export const getIsFollowingProgress = (state) => {
    return state.usersReducer.isFollowingProgress;
}


