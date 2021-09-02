import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, userName: "USER 1", postMessage: "Post Message 111" },
    { id: 2, userName: "USER 2", postMessage: "Post Message 222" },
    { id: 3, userName: "USER 3", postMessage: "Post Message 333" },
  ],
  status: "",
};

let profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, userName: "USER 4", postMessage: action.newMessageBody}],
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter( post => post.id !== action.postId)}
        default:
            return state;
    }
}

export const addPost = (newMessageBody) => ({type: ADD_POST, newMessageBody});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId); 
    dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer;