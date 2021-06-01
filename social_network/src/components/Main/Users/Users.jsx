import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";
import * as axios from "axios";

export class Users extends React.Component {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users?count=5").then(response => {
            this.props.setUsers(response.data.items)}
        )
    }

    render() {

        let usersElements = this.props.users.map( user => (
            <div>
                <img src={user.photos.small != null ? user.photos.small : userIcon} alt="avatar" className={styles.user_avatar}/>
                <span>{user.name}</span>
                <div>{user.status != null ? user.status : "Status empty"}</div>
                <div>User Information:</div>
                <div>{`User id is: ${user.id}`}</div>
                <div>{user.followed ? <button onClick={ () => {this.props.unfollow(user.id)}}>Unfollow</button> : <button onClick={() => {this.props.follow(user.id)}}>Follow</button>}</div>
            </div>
        ))
        return (
            <div className={styles.users}>
                {usersElements}
            </div>
        )
    }
}