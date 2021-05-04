import React from "react";
import styles from "./Messages.module.scss";
import userIcon from "../../../common/img/users.jpg";

export const Messages = () => {
    return (
        <div className={styles.messages}>
           <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Message</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Message</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Message</div>
            </div>
        </div>
    )
}