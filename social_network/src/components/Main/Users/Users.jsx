import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";

export const Users = () => {
    return (
        <div className={styles.users}>
            <div>avatar + description</div>
            <div>
                <input type="text"/>
                <button>Add Post</button>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>User Name</span>
                <div>User Status</div>
                <div>User Information:</div>
                <div>Age</div>
                <div>Location</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>User Name</span>
                <div>User Status</div>
                <div>User Information:</div>
                <div>Age</div>
                <div>Location</div>
            </div>
            <div>
                <img src={userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>User Name</span>
                <div>User Status</div>
                <div>User Information:</div>
                <div>Age</div>
                <div>Location</div>
            </div>
        </div>
    )
}