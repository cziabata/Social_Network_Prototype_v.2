import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, maxLenghtCreator } from "../../../common/utils/validators/validators";
import { Textarea } from "../../common/FormControls/FormControls";
import styles from "./Profile.module.scss";
import { ProfileStatus } from "./ProfileStatus";
{/*import userPhoto from "../../../common/img/users.jpg";*/}

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
    let addPost = (values) => {
        props.addPost(values.newMessageBody);
    };
    {/* updatePhoto = (event) => {
        if(event.target.files.length) {
            props.updateProfilePhoto(event.target.files[0])
    
        }
    }*/}
    return (
        
        <div className={styles.profile}>
            {/*<div><img src={props.photo || userPhoto} alt={"user ava"} /><input type={"file"} onChange={updatePhoto} /></div>*/}
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
})