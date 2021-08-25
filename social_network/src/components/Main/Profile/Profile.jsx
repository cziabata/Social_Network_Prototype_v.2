import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Profile.module.scss";
import { ProfileStatus } from "./ProfileStatus";

let AddNewPostForm = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Enter your message"} name={"newMessageBody"} component={"textarea"}/>
            </div>
            <button>Add Post</button>
        </form>
    )
}
let AddNewPostReduxForm = reduxForm({form: "addNewPost"})(AddNewPostForm);

export const Profile = (props) => {

    let addPost = (values) => {
        props.addPost(values.newMessageBody);
    };

    return (
        <div className={styles.profile}>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            <div>avatar + description</div>
            <div>
                <AddNewPostReduxForm onSubmit={addPost}/>
            </div>
            <div>
                {props.postElements}
            </div>
        </div>
    )
}