import React from "react";
import { connect } from "react-redux";
import { Profile } from "./Profile";
import { addPost, updateNewPostText } from "../../../redux/profileReducer";
import { Post } from "./Posts/Posts";
import { Redirect } from "react-router-dom";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
    }
}

class ProfileContainer extends React.Component {
    render() {

        let postElements = this.props.posts.map(posts => { return (<Post userName={posts.userName} postMessage={posts.postMessage} 
            id={posts.id}
            key={posts.id}/>)});

        return (
            <>
                <Profile postElements={postElements} newPostText={this.props.newPostText} addPost={this.props.addPost} 
                         updateNewPostText={this.props.updateNewPostText}/>
            </>
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

export default connect(mapStateToProps, {addPost, updateNewPostText})(AuthRedirectComponent)