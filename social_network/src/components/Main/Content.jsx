import React from "react";
import { Route } from "react-router-dom";
import styles from "./Content.module.scss";
import ProfileContainer from "./Profile/ProfileContainer";
import { MessagesContainer } from "./Messages/MessagesContainer";
import UserProfileContainer from "./Users/UserProfile/UserProfileContainer";
import UsersContainer from "./Users/UsersContainer";
import { Login } from "../Login/Login";


export const Content = () => {
    
    return(
        <main className={styles.content}>
            <Route render={ () => <ProfileContainer /> } exact path="/profile"/>
            <Route render={ () => <UserProfileContainer /> }  path="/profile/:userId"/>
            <Route render={ () => <UsersContainer /> } path="/users"/>
            <Route render={ () => <MessagesContainer /> } path="/messages"/>
            <Route render={ () => <Login /> } path="/login"/>
        </main>
    )
}