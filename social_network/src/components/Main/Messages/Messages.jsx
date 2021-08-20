import React from "react";
import styles from "./Messages.module.scss";
import { Message } from "./Message/Message";

export const Messages = (props) => {

    let messageElements = props.messages.map( message => {return(<Message id={message.id} 
                                                                    userName={message.userName} 
                                                                    messageText={message.messageText}
                                                                    key={message.id} />
    )});

    let messageInput = React.createRef();

    let addMessage = () => {
        props.addMessage();
    }
    let updateNewMessageBody = () => {
        props.updateNewMessageBody(messageInput.current.value);
    }
    return (
        <div className={styles.messages}>
            <div><textarea ref={messageInput} value={props.newMessageBody} onChange={updateNewMessageBody}></textarea></div>
            <button onClick={addMessage}>Send Message</button>
            <div>
                {messageElements}
            </div>
        </div>
    )
}