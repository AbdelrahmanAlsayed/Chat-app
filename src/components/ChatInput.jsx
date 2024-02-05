import { useState } from "react";
import { useAuth } from "../context/AppProvider";
import { useChat } from "../context/ChatProvider";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { init } from 'emoji-mart';
init({ data })


function ChatInput() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const { user } = useAuth();
    const { chatData } = useChat();
    const [ isPickerVisible, setIsPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const { isDarkMode } = useAuth();


    const handleSend = async (e) => {
        e.preventDefault();

        if (text.trim() === "" && currentEmoji === null && file === null) {
            return;
        }
        if (file) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, file);
            try {
                await uploadTask;
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await updateDoc(doc(db, "chats", chatData.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: user.uid,
                        date: Timestamp.now(),
                        file: downloadURL,
                    }),
                });
            } catch (error) {
                // console.error("Error during file upload:", error);
            }
        }
        
        else {
            await updateDoc(doc(db, "chats", chatData.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, "userChats", user.uid), {
            [chatData.chatId + ".lastMessage"]: {
                text,
            },
            [chatData.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", chatData.chosenUser.uid), {
            [chatData.chatId + ".lastMessage"]: {
                text,
            },
            [chatData.chatId + ".date"]: serverTimestamp(),
        });

        setFile(null);
        setText("");
        setCurrentEmoji(null)
        if(isPickerVisible) {
            setIsPickerVisible(!isPickerVisible);
        }
    }

    return (
        <footer className="relative">
            <div className={`transition-all duration-50 ease-in ${isPickerVisible ? "opacity-100 visible" : "opacity-0 invisible"} absolute bottom-[80px] left-5`}>
                <Picker
                    data={data}
                    theme={isDarkMode ? "dark" : "light"}
                    emojiSize= "18"
                    onEmojiSelect={(e) => {
                        const emojiText = e.native; 
                        setCurrentEmoji(e.facebook);
                        setText((prevText) => prevText + emojiText);
                    }}
                />
            </div>
            <form>
                <label htmlFor="chat" className="sr-only">
                    Your message
                </label>
                <div className="flex items-center px-4 py-3 rounded bg-light-secBg dark:bg-dark-secBg">
                    <div className="file-upload">
                        <label htmlFor="file-input" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg
                                className="w-5 h-5"
                                title="send"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 18"
                            >
                                <path
                                    fill="currentColor"
                                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                />
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                />
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                                />
                            </svg>
                        </label>
                        <input id="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button
                        type="button"
                        title="Send emoji"
                        onClick={() => setIsPickerVisible(!isPickerVisible)}
                        className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                            />
                        </svg>
                        <span className="sr-only">Add emoji</span>
                    </button>
                    <textarea
                        id="chat"
                        rows="1"
                        title="write your message"
                        className="block mx-4 p-2.5 w-full text-sm rounded-lg border border-light-secColor focus:outline-none dark:border-dark-secColor bg-light-mainBg dark:bg-dark-mainBg placeholder-light-secColor dark:placeholder-dark-secColor  text-light-mainColor dark:text-dark-mainColor"
                        placeholder="Your message..."
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    ></textarea>
                    <button
                        type="submit"
                        onClick={handleSend}
                        title="Send message"
                        className="inline-flex justify-center p-2 text-light-blueColor rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                    >
                        <svg
                            className="w-5 h-5 rotate-90 rtl:-rotate-90"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                        >
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </footer>
    )
}

export default ChatInput;


