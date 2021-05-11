import React from "react";
import { Route } from "react-router-dom";
import { Users } from "./Users/Users";
import styles from "./Content.module.scss";
import { ProfileContainer } from "./Profile/ProfileContainer";
import { MessagesContainer } from "./Messages/MessagesContainer";

export const Content = (props) => {
    
    return(
        <main className={styles.content}>
            <Route render={ () => <ProfileContainer /> } path="/profile"/>
            <Route render={ () => <Users /> } path="/users"/>
            <Route render={ () => <MessagesContainer /> } path="/messages"/>
        </main>
    )
}