import { connect } from "react-redux";
import { Messages } from "./Messages";
import { addMessageAC, updateNewMessageBodyAC } from "../../../redux/messagesReducer";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";

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

let AuthRedirectComponent = withAuthRedirect(Messages)

export let MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);