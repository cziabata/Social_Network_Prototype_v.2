import { connect } from "react-redux";
import { Profile } from "./Profile";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profileReducer";

let mapStateToProps = (state) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => dispatch(addPostAC()),
        updateNewPostMessage: (text) => dispatch(updateNewPostTextAC(text))
    }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)