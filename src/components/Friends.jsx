import { useChat } from "../context/ChatProvider";
import { useFriends } from "../context/FriendsProvider";

function Friends() {
    const { dispatch } = useChat();
    const { friendsChats } = useFriends();

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };


    return (
        <>
            {Object.values(friendsChats) && Object.values(friendsChats).length > 0 && (
                <h1 className="p-3 font-bold">Your Friends : {Object.values(friendsChats).length}</h1>
            )}
            {Object.values(friendsChats) && Object.values(friendsChats).length > 0 && (
                Object.values(friendsChats).map((friendChat) => {
                    return (
                        <div
                            key={friendChat.userInfo?.uid}
                            onClick={() => handleSelect(friendChat.userInfo)}
                        >
                            <div className="special-1 overflow-y-auto overflow-x-hidden my-3 px-4">
                                <div className="userChat overflow-auto hover:scale-x-105 cursor-pointer duration-200 p-3 rounded-2xl flex items-center justify-between  bg-light-thirdBg dark:bg-dark-thirdBg">
                                    <div className="flex justify-center items-center gap-x-5">
                                        <span className="w-10 h-10 bg-light-fourthBg dark:bg-dark-fourthBg text-light-mainColor dark:text-dark-mainColor rounded-full flex justify-center items-center">
                                            {friendChat.userInfo?.displayName
                                                .split(" ")
                                                .map((word) => word[0])
                                                .join("")
                                                .toUpperCase()}
                                        </span>
                                        <div className="useInfo flex flex-col items-start justify-start gap-y-1">
                                            <span className="font-bold text-sm">
                                                {friendChat.userInfo?.displayName}
                                            </span>
                                            <p className="text-xs tracking-wide self-start">
                                                {friendChat.lastMessage?.text.slice(0, 15)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="time flex flex-col gap-y-1">
                                        <span className="text-[11px] text-nowrap">
                                            {new Date(
                                                friendChat.date?.seconds * 1000)
                                                .toLocaleTimeString([],
                                                    { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="text-[11px] text-nowrap">
                                            {new Date(
                                                friendChat.date?.seconds * 1000 +
                                                friendChat.date?.nanoseconds / 1e6
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}

export default Friends;
