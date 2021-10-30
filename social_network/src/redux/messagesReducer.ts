import { InferActionTypes } from "./store";

type MessagesItemType = {
  id: number,
  userName: string,
  messageText: string
}

let initialState = {
  messages: [
    { id: 1, userName: "USER 111", messageText: "MESSAGE TEXT 111" },
    { id: 2, userName: "USER 222", messageText: "MESSAGE TEXT 222" },
    { id: 3, userName: "USER 333", messageText: "MESSAGE TEXT 333" },
    { id: 4, userName: "USER 444", messageText: "MESSAGE TEXT 333" },
  ] as Array<MessagesItemType>,
};

export type InitialStateType = typeof initialState;
export const actions = {
  addMessageAC: (newMessage:string) => ({type: "ADD_MESSAGE", newMessage} as const)
}
type ActionType = InferActionTypes<typeof actions>

let messagesReducer = (state = initialState, action:ActionType):InitialStateType => {
        switch(action.type) {
            case "ADD_MESSAGE":
                return {
                    ...state,
                    messages: [...state.messages, {id: 5, userName: "USER 555", messageText:action.newMessage}],
                };
            default:
                return state
        }
}
export default messagesReducer;