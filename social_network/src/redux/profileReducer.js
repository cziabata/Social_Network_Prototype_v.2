const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

let initialState = {
    profilePage: {
        posts: [
            {id: 1, userName: "USER 1", postMessage: "Post Message 111",},
            {id: 2, userName: "USER 2", postMessage: "Post Message 222",},
            {id: 3, userName: "USER 3", postMessage: "Post Message 333",},
        ],
        newPostText: "",
    }
}

let profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                userName: "USER 4",
                postMessage: state.profilePage.newPostText,
            };
            state.profilePage.posts.push(newPost);
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.profilePage.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostAC = () => ({type: ADD_POST});
export const updateNewPostTextAC = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;