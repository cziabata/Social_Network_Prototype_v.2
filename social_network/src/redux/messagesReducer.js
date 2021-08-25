const ADD_MESSAGE = "ADD_MESSAGE";

let initialState = {
  messages: [
    { id: 1, userName: "USER 111", messageText: "MESSAGE TEXT 111" },
    { id: 2, userName: "USER 222", messageText: "MESSAGE TEXT 222" },
    { id: 3, userName: "USER 333", messageText: "MESSAGE TEXT 333" },
    { id: 3, userName: "USER 333", messageText: "MESSAGE TEXT 333" },
  ],
  users: [],
};

let messagesReducer = (state = initialState, action) => {
        switch(action.type) {
            case ADD_MESSAGE:
                return {
                    ...state,
                    messages: [...state.messages, {id: 4, userName: "USER 444", messageText:action.newMessage}],
                };
            default:
                return state
        }
}

export const addMessageAC = (newMessage) => ({type: ADD_MESSAGE, newMessage});

export default messagesReducer;