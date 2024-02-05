import { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";

function Messages() {
    const { chatData } = useChat();
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [chatData.chatId]);

    return (
        <div className="messages">
            {messages.map((m) => {
                return <Message message={m} key={m.id} />;
            })}
        </div>
    );

}

export default Messages;