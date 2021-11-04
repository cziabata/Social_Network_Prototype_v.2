import React, { useEffect, useState } from "react";
import userIcon from "../../common/img/users.jpg";

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type ChatMessageType = {
    message: string,
    photo: string,
    userId:number,
    userName: string,

}

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

    const[messages, setMessages]=useState<ChatMessageType[]>([])
    useEffect(()=>{
        ws.addEventListener("message", (e)=>{
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=>[...prevMessages, ...newMessages])
        })
    },[])
    return(
        <div style={{height:"400px", overflowY:"auto"}}>
            {messages.map((m, index)=><Message key={index} message={m}/>)}
        </div>
    )
}
const Message:React.FC<{message:ChatMessageType}> = ({message}) => {
    return(
        <>
            <div><img src={message.photo} alt="user" style={{width: "30px", height:"30px"}} /><b>{message.userName}</b></div>
            <hr />
            <div>{message.message}</div>
        </>
    )
}
const AddMessageForm:React.FC = () => {
    const [message, setMessage] = useState("")
    const sendMessage = () => {
        if(!message){
            return
        }
        ws.send(message)
        setMessage("")
    }
    return(
        <>
            <div><textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div><button onClick={sendMessage}>Send</button></div>
        </>
    )
}

export default ChatPage