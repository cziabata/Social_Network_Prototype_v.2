import { connect } from "react-redux";
import { Messages } from "./Messages";
import { addMessageAC, updateNewMessageBodyAC } from "../../../redux/messagesReducer";

let mapStateToProps = (state) => {
    return {
        messages: state.messagesReducer.messages,
        newMessageBody: state.messagesReducer.newMessageBody,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => dispatch(addMessageAC()),
        updateNewMessageBody: (text) => dispatch(updateNewMessageBodyAC(text))
    }
}

export let MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);