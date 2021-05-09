import React from "react";
import styles from "./Posts.module.scss";
import userIcon from "../../../../common/img/users.jpg";

export const Post = (props) => {
    return(
        <div>
            <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
            <span>{props.userName}</span>
            <div>{props.postMessage}</div>
        </div>
    )
}