import React from "react";
import { Route } from "react-router-dom";
import { Users } from "./Users/Users";
import { Profile } from "./Profile/Profile";
import { Messages } from "./Messages/Messages";
import styles from "./Content.module.scss";

export const Content = (props) => {
    
    return(
        <main className={styles.content}>
            <Route render={ () => <Profile state={props.state.profileReducer.profilePage} dispatch={props.dispatch}/> } path="/profile"/>
            <Route render={ () => <Users /> } path="/users"/>
            <Route render={ () => <Messages state={props.state.messagesReducer.messagesPage} dispatch={props.dispatch}/> } path="/messages"/>
        </main>
    )
}