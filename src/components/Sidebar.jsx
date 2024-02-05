import { NavLink, Navigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { CgSun, CgMoon } from "react-icons/cg";
import { useAuth } from "../context/AppProvider";
import { useChat } from "../context/ChatProvider";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useState } from "react";


function Sidebar() {
    const { logOut, user, toggleMode, isDarkMode } = useAuth();
    const { chatData } = useChat();
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        const htmlElement = document.documentElement;
        if (!document.fullscreenElement) {
            if (htmlElement.requestFullscreen) {
                htmlElement.requestFullscreen();
            } else if (htmlElement.mozRequestFullScreen) {
                htmlElement.mozRequestFullScreen();
            } else if (htmlElement.webkitRequestFullscreen) {
                htmlElement.webkitRequestFullscreen();
            } else if (htmlElement.msRequestFullscreen) {
                htmlElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    const handleLogOut = async () => {
        await logOut();
        <Navigate to="/signin" replace="true" />
    }

    return (
        <div className={`${chatData.chosenUser !== null ? "hidden" : "flex"} sidebar w-20 bg-light-mainBg dark:bg-dark-mainBg text-light-mainColor dark:text-dark-mainColor min-h-screen py-4 px-3 md:flex flex-col items-center gap-8`}>
            <NavLink to="/profile" title="Profile" className="w-10 h-10 font-bold bg-gray-300 text-black rounded-full flex justify-center items-center">
                {user && user.displayName.split(' ').map(word => word[0]).join('').toUpperCase()}
            </NavLink>
            <span className="w-full h-px bg-light-secColor"></span>
            <NavLink to="/" title="chats" className="w-8 flex justify-center items-center">
                <MdOutlineMessage className="w-5 h-5" />
            </NavLink>
            <NavLink to="/users" title="users" className="w-8 flex justify-center items-center">
                <LuUsers className="w-5 h-5" />
            </NavLink>
            <button onClick={toggleMode} className="w-8 flex justify-center items-center mt-auto" title="toggle the theme">
                {isDarkMode ? (<CgMoon className="w-5 h-5" />) : (<CgSun className="w-5 h-5" />)}
            </button>
            <button onClick={toggleFullScreen} className="w-8 flex justify-center items-center " title="toggle  Full Screen">
                {isFullScreen ? (<MdFullscreen className="w-7 h-7" />) : (<MdFullscreenExit className="w-7 h-7" />)}
            </button>
            <NavLink to="/signin" onClick={handleLogOut} title="Log out" className="w-8 flex justify-center items-center mb-4 text-[#ce4250] rounded-lg">
                <IoLogOutOutline className="w-7 h-7" />
            </NavLink>
        </div>
    );
}

export default Sidebar;
