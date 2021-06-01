import React from "react";
import { Route } from "react-router-dom";
import styles from "./Content.module.scss";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { UsersComtainer } from "./Users/UsersComtainer";

export const Content = (props) => {
    
    return(
        <main className={styles.content}>
            <Route render={ () => <ProfileContainer /> } path="/profile"/>
            <Route render={ () => <UsersComtainer /> } path="/users"/>
            <Route render={ () => <MessagesContainer /> } path="/messages"/>
        </main>
    )
}