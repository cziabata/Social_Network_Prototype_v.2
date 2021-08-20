import { connect } from "react-redux";
import { Messages } from "./Messages";
import { addMessageAC, updateNewMessageBodyAC } from "../../../redux/messagesReducer";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

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

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Messages)