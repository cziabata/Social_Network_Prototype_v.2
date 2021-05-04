import React from "react";
import { NavLink } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import styles from "./Navbar.module.scss";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/profile">
                <div className={styles.link_wrapper}><Icon>account_circle</Icon><span>Profile</span></div>
            </NavLink>
            <NavLink to="/messages">
                <div className={styles.link_wrapper}><Icon>question_answer</Icon><span>Messages</span></div>
            </NavLink>
            <NavLink to="/users">
                <div className={styles.link_wrapper}><Icon>people</Icon><span>Users</span></div>
            </NavLink>
        </nav>
    )
}