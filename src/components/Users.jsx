import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from "./Sidebar";
import { IoClose, IoMenu } from "react-icons/io5";
import { useAuth } from "../context/AppProvider";
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useChat } from "../context/ChatProvider";


function Users() {
    const { handleSidebar, isSideOpen } = useAuth();
    const [chats, setAllchats] = useState([]);
    const { user } = useAuth();
    const { dispatch } = useChat();

    useEffect(() => {
        handleAllUsers();
    }, []);

    const handleAllUsers = async () => {
        try {
            const q = collection(db, 'users');
            const querySnapshot = await getDocs(q);
            const chats = querySnapshot.docs.map((doc) => doc.data());
            setAllchats(chats);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSelect = async (foundedUser) => {
        dispatch({ type: "CHANGE_USER", payload: foundedUser });
        const combinedId =
            user.uid > foundedUser.uid
                ? user.uid + foundedUser.uid
                : foundedUser.uid + user.uid;
        try {
            const chatDoc = await getDoc(doc(db, "chats", combinedId));
            if (!chatDoc.exists()) {
                console.log("Chat does not exist, creating...");
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
            }
            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: foundedUser.uid,
                    displayName: foundedUser.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", foundedUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            // console.error("Error handling selection:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full ">
                <div className="w-full md:w-2/5 px-4 py-5 chats min-h-screen bg-light-secBg dark:bg-dark-secBg text-light-mainColor dark:text-dark-mainColor">
                    <div className="flex justify-between items-center">
                        <button onClick={handleSidebar}>
                            {isSideOpen ? (<IoClose className="icon" title="close sdebar" />) : (<IoMenu className="icon" title="open sdebar" />)}
                        </button>
                        <IoIosNotificationsOutline className="icon" title="notifications" />
                    </div>
                    <h1 className="text-xl font-bold py-4">All users : {chats.length}</h1>
                    <section className="special-2 overflow-y-auto">
                        {chats && chats.length > 0 ? (
                            chats
                                .filter((chat) => chat.uid !== user.uid)
                                .map((chat) => (
                                    <div key={chat.uid} onClick={() => handleSelect(chat)} className="mt-3 px-3 text-center text-sm">
                                        <div className="userChat hover:scale-x-105 cursor-pointer duration-200 p-3 rounded-2xl flex items-center justify-between gap-x-5 bg-light-thirdBg dark:bg-dark-thirdBg">
                                            <div className="flex justify-center items-center gap-x-5">
                                                <div className="image">
                                                    <span className="w-10 h-10 font-bold bg-light-fourthBg dark:bg-dark-fourthBg text-light-mainColor dark:text-dark-mainColor rounded-full flex justify-center items-center">
                                                        {chat.displayName.split(' ').map((word) => word[0]).join('').toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="useInfo flex flex-col items-start gap-y-3">
                                                    <span className="font-bold">{chat.displayName}</span>
                                                    <p className="text-xs tracking-wide"></p>
                                                </div>
                                            </div>
                                            <div className="bg-light-fourthBg dark:bg-dark-fourthBg rounded-full p-1.5">
                                                <IoMdArrowRoundForward className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <span className="block m-auto animate-spin text-center rounded-full border-l-light-secBg dark:border-l-dark-secBg w-10 h-10 border-4 border-light-fourthBg dark:border-dark-fourthBg "></span>
                        )}
                    </section>
                </div>
                <Chat />
            </main>
        </div>
    )
}

export default Users;

