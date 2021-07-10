import React from "react";
import styles from "./Users.module.scss";
import preloader from "../../../common/img/preloader.svg";

    export const Users = (props) => {
        return (
            <>
                <div>{props.isFetching ? <img src={preloader} alt="preloader"/> : null}</div>
                <div className={styles.paginationWrapper}>
                    { props.pages.map( page => <span className={props.currentPage === page && styles.currentPage} 
                                                     onClick={ () => {props.onPageChanged(page)} }>{page}</span> ) }
                </div>
                <div className={styles.users}>
                    {props.usersElements}
                </div>
            </>
        )
    }
      