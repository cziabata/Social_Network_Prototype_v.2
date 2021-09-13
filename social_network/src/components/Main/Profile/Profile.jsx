import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { required, maxLenghtCreator } from "../../../common/utils/validators/validators";
import { Textarea, Input } from "../../common/FormControls/FormControls";
import styles from "./Profile.module.scss";
import { ProfileStatus } from "./ProfileStatus";
import { Preloader } from "../../common/Preloader/Preloader";
import classes from "../../common/FormControls/FormControls.module.css";

let maxLength10 = maxLenghtCreator(10);

let AddNewPostForm = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Enter your message"} 
                       name={"newMessageBody"} 
                       component={Textarea}
                       validate={[required, maxLength10]}/>
            </div>
            <button>Add Post</button>
        </form>
    )
}
let AddNewPostReduxForm = reduxForm({form: "addNewPost"})(AddNewPostForm);

let ProfileDataForm = (props) => {
    let {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
            <div><b>Full name</b>:  <Field placeholder={"Full name"} 
                       name={"FullName"} 
                       component={Input} />
            </div>
            <b>Looking for a job</b>:  <Field placeholder={"Are you looking for a job?"} 
                       name={"LookingForAJob"} 
                       component="input" 
                       type="checkbox" />
            </div>
            <div>
            <b>My professional skills</b>:  <Field placeholder={"Enter your skills"} 
                       name={"LookingForAJobDescription"} 
                       component={Textarea} />
            </div>
            <div>
            <b>About me</b>:  <Field placeholder={"About me"} 
                       name={"AboutMe"} 
                       component={Textarea} />
            </div>
            {props.error && <div className={classes.commonError}>{props.error}</div>}
            <button type="submit">Submit</button>
        </form>
    )
}
let ProfileDataReduxForm = reduxForm({form: "profileDataForm"})(ProfileDataForm);

let ProfileData = (props) => {
    return (
        <div>
            <div><button onClick={props.setEditeMode}>Edit...</button></div>
            <div><b>Looking for a job</b>: {props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "no"}</div>
            <div><b>lookingForAJobDescription</b>: {props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "no"}</div>
            <div><b>fullName</b>: {props.profile.fullName ? props.profile.fullName : "no"}</div>
            <div><b>Contacts</b>: {Object.keys(props.profile.contacts).map(keys => {
                return <Contacts key={keys} contactTitle={keys} contactValue={props.profile.contacts[keys]} />
            })}</div>
        </div>
    )
} 
let Contacts = ({contactTitle, contactValue}) => {
    return <div className={styles.contactItem}><b>{contactTitle}</b>: {contactValue}</div>
}

export const Profile = React.memo((props) => {
    let [editeMode, setEditeMode] = useState(false);

    if(!props.profile) {
        return <Preloader />
    }
    let addPost = (values) => {
        props.addPost(values.newMessageBody);
    };
    let saveProfileData = (values) => {
        props.saveProfile(values)
    }
    let updatePhoto = (event) => {
        if(event.target.files.length) {
            props.updateProfilePhoto(event.target.files[0])
        }
    }
    return (
        <div className={styles.profile}>
            <div><img src={props.profile.photos.large} alt={"user ava"} /><input type={"file"} onChange={updatePhoto} /></div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            {editeMode ? <ProfileDataReduxForm onSubmit={saveProfileData} /> : <ProfileData profile={props.profile} setEditeMode={ () => {setEditeMode(true)}} />}
            <div>
                <AddNewPostReduxForm onSubmit={addPost}/>
            </div>
            <div>
                {props.postElements}
            </div>
        </div>
    )
})
 
