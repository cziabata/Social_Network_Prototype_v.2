import React from "react";
import styles from "./Message.module.scss";
import userIcon from "../../../../common/img/users.jpg";

export const Message = (props) => {
    return (
        <div>
            <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
            <span>{props.userName}</span>
            <div>{props.messageText}</div>
        </div>
    )
}