import React from "react";
import userIcon from "../../common/img/users.jpg";

const ChatPage:React.FC = () => {
    return(
        <>
            <Chat />
        </>
    )
}
const Chat:React.FC = () => {
    return(
        <>
            <Messages />
            <AddMessageForm />
        </>
    )
}
const Messages:React.FC = () => {
    const messages = [1,2,3,4]
    return(
        <div style={{height:"400px", overflowY:"auto"}}>
            {messages.map((m:any)=><Message />)}
            {messages.map((m:any)=><Message />)}
            {messages.map((m:any)=><Message />)}
            {messages.map((m:any)=><Message />)}
        </div>
    )
}
const Message:React.FC = () => {
    const message = {
        img: userIcon,
        name: "cziabata",
        text: "Message for chat"
    }
    return(
        <>
            <div><img src={message.img} alt="user" style={{width: "30px", height:"30px"}} /><b>{message.name}</b></div>
            <hr />
            <div>{message.text}</div>
        </>
    )
}
const AddMessageForm:React.FC = () => {
    return(
        <>
            <div><textarea></textarea></div>
            <div><button>Send</button></div>
        </>
    )
}

export default ChatPage