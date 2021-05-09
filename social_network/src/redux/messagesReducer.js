const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";

let initialState = {
    messagesPage: {
        messages: [
            {id: 1, userName: "USER 111", messageText: "MESSAGE TEXT 111",},
            {id: 2, userName: "USER 222", messageText: "MESSAGE TEXT 222",},
            {id: 3, userName: "USER 333", messageText: "MESSAGE TEXT 333",},
            {id: 3, userName: "USER 333", messageText: "MESSAGE TEXT 333",},
        ],
        newMessageBody: "111",
        users: [],
    }
}

let messagesReducer = (state = initialState, action) => {
        switch(action.type) {
            case ADD_MESSAGE:
                let newMessage = {
                    id: 4,
                    userName: "USER 444",
                    messageText: state.messagesPage.newMessageBody,
                };
                state.messagesPage.messages.push(newMessage);
                state.messagesPage.newMessageBody = "";
                return state;
            case UPDATE_NEW_MESSAGE_BODY:
                state.messagesPage.newMessageBody = action.newMessage;
                return state;
            default:
                return state
        }
}

export const addMessageAC = () => ({type: ADD_MESSAGE});
export const updateNewMessageBodyAC = (message) => ({type: UPDATE_NEW_MESSAGE_BODY, newMessage: message});

export default messagesReducer;