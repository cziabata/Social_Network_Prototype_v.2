import React, { useState } from "react";
import styles from "./Paginator.module.scss";
import cn from "classnames";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    portionSize: number,
    currentPage: number,
    onPageChanged: (page:number)=>void
}

export const Paginator:React.FC<PropsType> = ({totalUsersCount, pageSize, portionSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for(let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionBorder = (portionNumber - 1) * portionSize + 1;
    let rightPortionBorder = portionNumber * portionSize;
    return <>
        <div className={styles.paginationWrapper}>
            { portionNumber > 1 && <button onClick={ () => {setPortionNumber(portionNumber-1)}}>{"< Prev"}</button>}
            { pages.filter(page => page >= leftPortionBorder && page <= rightPortionBorder).map( 
                           page => <span key={page} className={cn({[styles.currentPage]:currentPage === page}) } 
                                         onClick={ () => {onPageChanged(page)} }>{page}</span> ) }
            { portionCount > portionNumber && <button onClick={ () => {setPortionNumber(portionNumber+1)}}>{"Next >"}</button>}
        </div>
    </>
}