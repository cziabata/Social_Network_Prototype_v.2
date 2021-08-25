import React from "react";
import styles from "./Messages.module.scss";
import { Message } from "./Message/Message";
import { Field, reduxForm } from "redux-form";

let addMessageForm = (props) => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Ente your message"} name={"newMessage"} component={"textarea"}/>
            </div>
            <button>Send Message</button>
        </form>
    )
}
let AddMessageReduxForm = reduxForm({form: "addMessageForm"})(addMessageForm);

export const Messages = (props) => {
    let messageElements = props.messages.map( message => {return(<Message id={message.id} 
                                                                    userName={message.userName} 
                                                                    messageText={message.messageText}
                                                                    key={message.id} />
    )});

    let addMessage = (values) => {
        props.addMessage(values.newMessage);
    }
    return (
        <div className={styles.messages}>
            <AddMessageReduxForm onSubmit={addMessage}/>
            <div>
                {messageElements}
            </div>
        </div>
    )
}