import React from "react";
import { Route } from "react-router-dom";
import styles from "./Content.module.scss";
import ProfileContainer from "./Profile/ProfileContainer";
import { MessagesContainer } from "./Messages/MessagesContainer";
import UserProfileContainer from "./Users/UserProfile/UserProfileContainer";
import UsersContainer from "./Users/UsersContainer";


export const Content = (props) => {
    
    return(
        <main className={styles.content}>
            <Route render={ () => <ProfileContainer /> } exact path="/profile"/>
            <Route render={ () => <UserProfileContainer /> }  path="/profile/:userId"/>
            <Route render={ () => <UsersContainer /> } path="/users"/>
            <Route render={ () => <MessagesContainer /> } path="/messages"/>
        </main>
    )
}