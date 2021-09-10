import React from "react";
import { connect } from "react-redux";
import { Profile } from "./Profile";
import { addPost, getStatus, updateStatus, chooseProfile, updateProfilePhoto } from "../../../redux/profileReducer";
import { Post } from "./Posts/Posts";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profileReducer.posts,
        status: state.profileReducer.status,
        authorizedUserId: state.authReducer.id,
        isAuth: state.authReducer.isAuth,
        profile: state.profileReducer.profile
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getStatus(this.props.authorizedUserId);
        this.props.chooseProfile(this.props.authorizedUserId);
    }
    render() {

        let postElements = this.props.posts.map(posts => { return (<Post userName={posts.userName} postMessage={posts.postMessage} 
            id={posts.id}
            key={posts.id}/>)});

        return (
            <>
                <Profile postElements={postElements} addPost={this.props.addPost} 
                         status={this.props.status} updateStatus={this.props.updateStatus}
                         profile={this.props.profile} updateProfilePhoto={this.props.updateProfilePhoto}/>
            </>
        )
    }
}

export default compose(connect(mapStateToProps, {addPost, getStatus, updateStatus, chooseProfile, updateProfilePhoto}
    ),withAuthRedirect)(ProfileContainer);