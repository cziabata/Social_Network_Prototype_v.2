import React from "react";
import { Route } from "react-router-dom";
import { Users } from "./Users/Users";
import { Profile } from "./Profile/Profile";
import { Messages } from "./Messages/Messages";
import styles from "./Content.module.scss";

export const Content = () => {
    return(
        <main className={styles.content}>
            <Route render={ () => <Profile /> } path="/profile"/>
            <Route render={ () => <Users /> } path="/users"/>
            <Route render={ () => <Messages /> } path="/messages"/>
        </main>
    )
}