import React from "react";
import styles from "./Profile.module.scss";

export const Profile = (props) => {
    
    let postButton = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let updateNewPostMessage = () => {
        props.updateNewPostText(postButton.current.value);
    };

    return (
        <div className={styles.profile}>
            <div>avatar + description</div>
            <div>
                <div><textarea ref={postButton} onChange={updateNewPostMessage} value={props.newPostText}></textarea></div>
                <button  onClick={addPost}>Add Post</button>
            </div>
            <div>
                {props.postElements}
            </div>
        </div>
    )
}