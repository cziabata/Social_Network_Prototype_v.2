import React from "react";
import styles from "./Paginator.module.scss";

export const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }
    return <>
        <div className={styles.paginationWrapper}>
                    { pages.map( page => <span className={props.currentPage === page && styles.currentPage} 
                                                     onClick={ () => {props.onPageChanged(page)} }>{page}</span> ) }
                </div>
    </>
}