import { IoMenu, IoClose } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Chat from "./Chat";
import Search from "./Search";
import { useAuth } from "../context/AppProvider";

function Chats() {
    const { handleSidebar, isSideOpen } = useAuth();

    return (
        <main className="flex w-full">
            <div className={`w-full md:w-2/5 px-4 py-5 chats min-h-screen bg-light-secBg dark:bg-dark-secBg text-light-mainColor dark:text-dark-mainColor`}>
                <div className="flex justify-between items-center">
                    <button onClick={handleSidebar}>
                        {isSideOpen ? (<IoClose className="icon" title="close sdebar" />) : (<IoMenu className="icon" title="open sdebar" />)}
                    </button>
                    <IoIosNotificationsOutline className="icon" title="notifications" />
                </div>
                <h1 className="text-xl font-bold py-4">Chats</h1>
                <Search />
            </div>
            <Chat />
        </main>
    )
}

export default Chats
