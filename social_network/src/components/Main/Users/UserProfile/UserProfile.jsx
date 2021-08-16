import React from "react";
import preloader from "../../../../common/img/preloader.svg";

export let UserProfile = (props) => {
    if(!props.userProfile) {
        return <img src={preloader} alt={"preloader"}/>
    }
    return (
        <>
            <div>{props.isFetching ? <img src={preloader} alt={"preloader"} /> : null}</div>
            <div><img src={props.userProfile.photos.large} alt="User" /></div>
            <div>{"userId:  2"}</div>
            <div>{"lookingForAJob:  "}</div>
            <div>{"fullName:  "}</div>
            <div>{"contacts:  "}</div>
        </>
    )
}