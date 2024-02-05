import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AppProvider";
import PropTypes from 'prop-types';

const ChatContext = createContext();

function ChatProvider({ children }) {

    const { user } = useAuth();
    const INITIAL_STATE = {
        chatId: null,
        chosenUser: null,
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    chosenUser: action.payload,
                    chatId:
                        user.uid > action.payload.uid
                            ? user.uid + action.payload.uid
                            : action.payload.uid + user.uid,
                };
            case "CLOSE_CHAT":
                return INITIAL_STATE;
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ chatData: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired
};


// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
    return useContext(ChatContext);
}

export default ChatProvider;
