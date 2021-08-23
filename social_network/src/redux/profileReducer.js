import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, userName: "USER 1", postMessage: "Post Message 111" },
    { id: 2, userName: "USER 2", postMessage: "Post Message 222" },
    { id: 3, userName: "USER 3", postMessage: "Post Message 333" },
  ],
  newPostText: "",
  status: "",
};

let profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, userName: "USER 4", postMessage: state.newPostText}],
                newPostText: ""
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then( response => 
        dispatch(setStatus(response.data)) )
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then( response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
      }
    )
}

export default profileReducer;