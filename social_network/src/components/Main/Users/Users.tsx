import React from "react";
import styles from "./Users.module.scss";
import { Preloader } from "../../common/Preloader/Preloader";
import { Paginator } from "../../common/Paginator/Paginator";
import { UserItemType } from "../../../types/types";

type PropsType = {
    isFetching: boolean,
    totalUsersCount: number,
    pageSize: number, 
    onPageChanged: ()=>void,
    currentPage: number,
    portionSize: number,
    usersElements: Array<UserItemType>
}
    export const Users:React.FC<PropsType> = ({isFetching, totalUsersCount, pageSize, onPageChanged, currentPage, portionSize, usersElements}) => {
        return (
            <>
                <div>{isFetching ? <Preloader /> : null}</div>
                <Paginator totalUsersCount={totalUsersCount} 
                           pageSize={pageSize}
                           onPageChanged={onPageChanged}
                           currentPage={currentPage}
                           portionSize={portionSize}/>
                <div className={styles.users}>
                    {usersElements}
                </div>
            </>
        )
    }
      