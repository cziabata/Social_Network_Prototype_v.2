import React from "react";
import styles from "./Profile.module.scss";
import { Post } from "./Posts/Posts";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profileReducer";

export const Profile = (props) => {

    let postElements = props.state.posts.map(posts => { return (<Post userName={posts.userName} postMessage={posts.postMessage} id={posts.id}/>)});
    
    let postButton = React.createRef();

    let addPost = () => {
        props.dispatch(addPostAC());
    };

    let updateNewPostMessage = () => {
        let text = postButton.current.value;
        props.dispatch(updateNewPostTextAC(text));
    };

    return (
        <div className={styles.profile}>
            <div>avatar + description</div>
            <div>
                <div><textarea ref={postButton} onChange={updateNewPostMessage} value={props.state.newPostText}></textarea></div>
                <button  onClick={addPost}>Add Post</button>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    )
}