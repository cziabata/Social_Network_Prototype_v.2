import React from "react";
import styles from "./Messages.module.scss";
import { Message } from "./Message/Message";
import { addMessageAC, updateNewMessageBodyAC } from "../../../redux/messagesReducer";

export const Messages = (props) => {

    let messageElements = props.state.messages.map( message => {return(<Message id={message.id} 
                                                                    userName={message.userName} 
                                                                    messageText={message.messageText} />
    )});

    let messageInput = React.createRef();

    let addMessage = () => {
        props.dispatch(addMessageAC());
    }
    let updateNewMessageBody = () => {
        let text = messageInput.current.value;
        props.dispatch(updateNewMessageBodyAC(text))
    }

    return (
        <div className={styles.messages}>
            <div><textarea ref={messageInput} value={props.state.newMessageBody} onChange={updateNewMessageBody}></textarea></div>
            <button onClick={addMessage}>Send Message</button>
            <div>
                {messageElements}
            </div>
        </div>
    )
}