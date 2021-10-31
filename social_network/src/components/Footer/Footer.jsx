import React from "react";
import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import Icon from '@material-ui/core/Icon';

export const AppFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.link_container}>
                <NavLink to="/profile">
                    <div className={styles.link_wrapper}><Icon>info</Icon><span>About us</span></div>
                </NavLink>
             </div>
        </footer>
    )
}