import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, maxLenghtCreator } from "../../../common/utils/validators/validators";
import { Textarea } from "../../common/FormControls/FormControls";
import styles from "./Profile.module.scss";
import { ProfileStatus } from "./ProfileStatus";
import { Preloader } from "../../common/Preloader/Preloader";

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

export const Profile = React.memo((props) => {
    if(!props.profile) {
        return <Preloader />
    }
    let addPost = (values) => {
        props.addPost(values.newMessageBody);
    };
    let updatePhoto = (event) => {
        if(event.target.files.length) {
            props.updateProfilePhoto(event.target.files[0])
        }
    }
    return (
        
        <div className={styles.profile}>
            <div><img src={props.profile.photos.large} alt={"user ava"} /><input type={"file"} onChange={updatePhoto} /></div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            <ProfileData profile={props.profile} />
            <div>
                <AddNewPostReduxForm onSubmit={addPost}/>
            </div>
            <div>
                {props.postElements}
            </div>
        </div>
    )
})

let ProfileData = (profile) => {
    return (
        <div>
        <div><b>lookingForAJob</b>: {profile.profile.lookingForAJob ? "yes" : "no"}</div>
        <div><b>lookingForAJobDescription</b>: {profile.profile.lookingForAJobDescription ? "yes" : "no"}</div>
        <div><b>fullName</b>: {profile.profile.fullName ? profile.profile.fullName : "no"}</div>
        <div><b>Contacts</b>: {Object.keys(profile.profile.contacts).map(keys => {
            return <Contacts key={keys} contactTitle={keys} contactValue={profile.profile.contacts[keys]} />
        })}</div>
        </div>
    )
}

let Contacts = ({contactTitle, contactValue}) => {
    return <div className={styles.contactItem}><b>{contactTitle}</b>: {contactValue}</div>
}
    
