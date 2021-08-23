import React from "react";
import { connect } from "react-redux";
import { Profile } from "./Profile";
import { addPost, updateNewPostText, getStatus, updateStatus } from "../../../redux/profileReducer";
import { Post } from "./Posts/Posts";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        status: state.profileReducer.status,
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getStatus(9786)
    }
    render() {

        let postElements = this.props.posts.map(posts => { return (<Post userName={posts.userName} postMessage={posts.postMessage} 
            id={posts.id}
            key={posts.id}/>)});

        return (
            <>
                <Profile postElements={postElements} newPostText={this.props.newPostText} addPost={this.props.addPost} 
                         updateNewPostText={this.props.updateNewPostText} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </>
        )
    }
}

export default compose(connect(mapStateToProps, {addPost, updateNewPostText, getStatus, updateStatus}),withAuthRedirect)(ProfileContainer);