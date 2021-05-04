import React from "react";
import styles from "./Profile.module.scss";
import userIcon from "./../../../common/img/users.jpg";

export const Profile = () => {
    return (
        <div className={styles.profile}>
            <div>avatar + description</div>
            <div>
                <input type="text"/>
                <button>Add Post</button>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Post Message</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Post Message</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>My Name</span>
                <div>Post Message</div>
            </div>
        </div>
    )
}