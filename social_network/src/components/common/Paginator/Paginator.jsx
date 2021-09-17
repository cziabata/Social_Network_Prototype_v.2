import React, { useState } from "react";
import styles from "./Paginator.module.scss";

export const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for(let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionBorder = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionBorder = portionNumber * props.portionSize;
    return <>
        <div className={styles.paginationWrapper}>
            { portionNumber > 1 && <button onClick={ () => {setPortionNumber(portionNumber-1)}}>{"< Prev"}</button>}
            { pages.filter(page => page >= leftPortionBorder && page <= rightPortionBorder).map( 
                           page => <span key={page} className={props.currentPage === page && styles.currentPage} 
                                         onClick={ () => {props.onPageChanged(page)} }>{page}</span> ) }
            { portionCount > portionNumber && <button onClick={ () => {setPortionNumber(portionNumber+1)}}>{"Next >"}</button>}
        </div>
    </>
}