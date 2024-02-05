import { IoVideocamOutline, IoCallOutline, IoSearch, IoClose } from "react-icons/io5";
import ChatInput from "./ChatInput";
import { useChat } from "../context/ChatProvider";
import Messages from "./Messages";
import emptyImg from "../assets/empty.svg";
    
function Chat() {
    const { chatData, dispatch} = useChat();

    const firstLetters =
    (chatData.chosenUser?.displayName || '')
    .split(/\s+/).map(word => word.charAt(0));

    const handleCloseChat = () => {
        dispatch({ type: "CLOSE_CHAT" });
    };
    return (
        <>
            {chatData.chosenUser == null ? (
                <div className={`${chatData.chosenUser == null ? "hidden" : "absolute w-full h-screen"} md:static w-full md:w-3/5 md:flex flex-col justify-center items-center bg-light-thirdBg dark:bg-dark-thirdBg`}>
                    <img src={emptyImg} alt="empty Img" className="w-2/3" />
                    <h2 className="text-2xl font-bold text-light-mainColor dark:text-dark-mainColor">
                        No chat here
                    </h2>
                    <p className="text-light-mainColor dark:text-dark-mainColor">
                        Choose a chat to start the conversation.
                    </p>
                </div>
            ) : (
                <div className={`${chatData.chosenUser == null ? "hidden" : "absolute w-full h-screen"} md:static w-full md:w-3/5 md:flex flex-col justify-between bg-light-mainBg dark:bg-dark-mainBg text-light-mainColor dark:text-dark-mainColor`}>
                    <header className="px-5 py-3 flex justify-between items-center shadow-xl shadow-light-secBg dark:shadow-dark-secBg">
                        <div className="userInfo flex items-center gap-3">
                            <span className="w-9 h-9 font-bold cursor-pointer bg-light-fourthBg dark:bg-dark-fourthBg text-light-mainColor dark:text-dark-mainColor rounded-full flex justify-center items-center">
                                {firstLetters}
                            </span>
                            <div className="flex flex-col font-bold cursor-pointer">
                                <span>{chatData.chosenUser?.displayName}</span>
                            </div>
                        </div>
                        <div className="icons flex justify-center items-center gap-x-6">
                            <IoVideocamOutline className="w-5 h-5 cursor-pointer" title="Video" />
                            <IoCallOutline className="w-5 h-5 cursor-pointer" title="Audio" />
                            <IoSearch className="w-5 h-5 cursor-pointer" title="Search" />
                            <span className="w-px h-10 block bg-light-fourthBg dark:bg-dark-fourthBg"></span>
                            <IoClose className="w-6 h-6 cursor-pointer" title="Close the chat" onClick={handleCloseChat}/>
                        </div>
                    </header>
                    <main className="h-full special-2 overflow-y-auto">
                        <Messages />
                    </main>
                    <ChatInput />
                </div>
            )}
        </>
    );

}

export default Chat
