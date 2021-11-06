import React, { useEffect, useState } from "react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(()=>{
        let ws: WebSocket;
        const closeHandler = ()=>{
            console.log("Close Channel")
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener("close", closeHandler)
            ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChannel(ws)
        }
        createChannel()
        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }
    },[])
    useEffect(()=>{
        wsChannel?.addEventListener("open", ()=>{
            console.log("Open Channel")
        })
    },[wsChannel])
    return(
        <>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </>
    )
}
const Messages:React.FC<{wsChannel:WebSocket|null}> = ({wsChannel}) => {

    const[messages, setMessages]=useState<ChatMessageType[]>([])
    let messageHandler = (e:MessageEvent)=>{
        let newMessages = JSON.parse(e.data)
        setMessages((prevMessages)=>[...prevMessages, ...newMessages])
    }
    useEffect(()=>{
        wsChannel?.addEventListener("message", messageHandler)
        return ()=>{
            wsChannel?.removeEventListener("message", messageHandler)
        }
    },[wsChannel])
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
const AddMessageForm:React.FC<{wsChannel:WebSocket|null}> = ({wsChannel}) => {

    const[readyStatus, setReadyStatus] = useState<"ready" | "pending">("pending")
    const openHandler = ()=>{
        setReadyStatus("ready")
    }
    useEffect(()=>{
        wsChannel?.addEventListener("open", openHandler)
        return () => {
            wsChannel?.removeEventListener("open", openHandler)
        }
    }, [wsChannel])

    const [message, setMessage] = useState("")
    const sendMessage = () => {
        if(!message){
            return
        }
        wsChannel?.send(message)
        setMessage("")
    }
    return(
        <>
            <div><textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea></div>
            <div><button disabled={wsChannel === null && readyStatus !== "ready"} onClick={sendMessage}>Send</button></div>
        </>
    )
}

export default ChatPage