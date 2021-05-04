import React from "react";
import { NavLink } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
             <NavLink to="/profile">
                <div className={styles.link_wrapper}><Icon>facebook</Icon><span>Social_Network_Prototype v.2</span></div>
             </NavLink>
             <NavLink to="/login">
                <div className={styles.link_wrapper}><Icon>login</Icon><span>Login</span></div>
             </NavLink>
        </header>
    )
}