import React from "react";
import preloader from "../../../../common/img/preloader.svg";
import userPhoto from "../../../../common/img/users.jpg";
import styles from "./UserProfile.module.scss";

export let UserProfile = (props) => {
    if(!props.userProfile) {
        return <img src={preloader} alt={"preloader"}/>
    }
    return (
        <>
            <div>{props.isFetching ? <img src={preloader} alt={"preloader"} /> : null}</div>
            <div><img src={props.userProfile.photos.large || userPhoto} alt="User" className={styles.userPhoto} /></div>
            <div>{"userId:  2"}</div>
            <div>{"lookingForAJob:  "}</div>
            <div>{"fullName:  "}</div>
            <div>{"contacts:  "}</div>
        </>
    )
}