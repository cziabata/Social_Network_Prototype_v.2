import { connect } from "react-redux";
import { Messages } from "./Messages";
import { addMessageAC} from "../../../redux/messagesReducer";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        messages: state.messagesReducer.messages,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessage) => dispatch(addMessageAC(newMessage)),
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Messages)