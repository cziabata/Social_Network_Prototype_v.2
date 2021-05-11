import React from "react";
import styles from "./Profile.module.scss";
import { Post } from "./Posts/Posts";

export const Profile = (props) => {

    let postElements = props.posts.map(posts => { return (<Post userName={posts.userName} postMessage={posts.postMessage} 
                                                                id={posts.id}
                                                                key={posts.id}/>)});
    
    let postButton = React.createRef();

    let addPost = () => {
        props.addPost();
    };

    let updateNewPostMessage = () => {
        props.updateNewPostMessage(postButton.current.value);
    };

    return (
        <div className={styles.profile}>
            <div>avatar + description</div>
            <div>
                <div><textarea ref={postButton} onChange={updateNewPostMessage} value={props.newPostText}></textarea></div>
                <button  onClick={addPost}>Add Post</button>
            </div>
            <div>
                {postElements}
            </div>
        </div>
    )
}