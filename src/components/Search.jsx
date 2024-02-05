import { IoMdArrowRoundForward, IoMdSearch } from "react-icons/io";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useState } from "react";
import { useAuth } from "../context/AppProvider";
import { useChat } from '../context/ChatProvider';
import Friends from "./Friends";
import { useFriends } from "../context/FriendsProvider";
import noChatsImg from "../assets/noChats.svg";

function Search() {
    const { user } = useAuth();
    const { dispatch } = useChat();
    const [foundedUsers, setFoundedUsers] = useState([]);
    const { friendsChats } = useFriends();
    const chatsArray = Object.values(friendsChats);

    const handleSearch = async (e) => {
        const inputValue = e.target.value.trim();
        if (inputValue === "") {
            setFoundedUsers([]);
            return;
        }
        const q = query(
            collection(db, "users"),
            where("displayName", ">=", inputValue),
            where("displayName", "<=", inputValue + "\uf8ff")
        );
        try {
            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setFoundedUsers(users);
        } catch (error) {
            // console.error("Error fetching users:", error);
        }
    }

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
        <>
            <div className="relative">
                <div className=" absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IoMdSearch className="w-5 h-5 text-light-secColor dark:text-dark-secColor" />
                </div>
                <input
                    onChange={handleSearch}
                    type="search"
                    id="default-search"
                    autoComplete="off"
                    className="bg-light-mainBg dark:bg-dark-mainBg block w-full p-3 ps-10 text-sm rounded-full focus:outline-none border border-light-thirdBg dark:border-dark-thirdBg "
                    placeholder="Search users..."
                />
            </div>
            <div className="special-1 overflow-y-auto">
                {foundedUsers && foundedUsers.length > 0 && (
                    foundedUsers.map((foundedUser) => (
                        <div key={foundedUser.uid} onClick={() => handleSelect(foundedUser)} className="special-1 overflow-y-auto overflow-x-hidden my-3">
                            <div className="mt-3 px-4 text-center text-sm">
                                <div className="userChat hover:scale-x-105 cursor-pointer duration-200 p-3 rounded-2xl flex items-center justify-between gap-x-5 bg-light-thirdBg dark:bg-dark-thirdBg">
                                    <div className="flex justify-center items-center gap-x-5">
                                        <div className="image">
                                            <span className="w-10 h-10 bg-light-fourthBg dark:bg-dark-fourthBg text-light-mainColor dark:text-dark-mainColor rounded-full flex justify-center items-center">
                                                {foundedUser && foundedUser.displayName.split(' ').map(word => word[0]).join('').toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="useInfo flex flex-col items-start gap-y-1">
                                            <span className="font-bold">{foundedUser.displayName}</span>
                                        </div>
                                    </div>
                                    <div className="bg-light-fourthBg dark:bg-dark-fourthBg rounded-full p-1.5">
                                        <IoMdArrowRoundForward className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <Friends />
            </div>
            {(!foundedUsers || foundedUsers.length === 0) && (!chatsArray || chatsArray.length === 0) && (
                <div className="text-center alternative">
                    <img src={noChatsImg} alt="no chats image" className="w-2/3 block m-auto pb-1" />
                    <h1 className="text-xl font-bold pb-2">Empty Chats</h1>
                    <p className="text-light-secColor dark:text-dark-secColor">Search for a specific user or select a user from the user list to engage in a conversation with them.</p>
                </div>
            )}
        </>
    )
}

export default Search;
