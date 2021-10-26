import React from "react";
import styles from "./Users.module.scss";
import { Preloader } from "../../common/Preloader/Preloader";
import { Paginator } from "../../common/Paginator/Paginator";

    export const Users = (props) => {
        return (
            <>
                <div>{props.isFetching ? <Preloader /> : null}</div>
                <Paginator totalUsersCount={props.totalUsersCount} 
                           pageSize={props.pageSize}
                           onPageChanged={props.onPageChanged}
                           currentPage={props.currentPage}
                           portionSize={props.portionSize}/>
                <div className={styles.users}>
                    {props.usersElements}
                </div>
            </>
        )
    }
      