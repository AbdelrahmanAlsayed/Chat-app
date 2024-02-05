import { useAuth } from "../context/AppProvider";
import { useFriends } from "../context/FriendsProvider";
import Sidebar from "./Sidebar";

function Profile() {
    const { user } = useAuth();
    const { friendsChats } = useFriends();
    const numberOfFriends = Object.values(friendsChats).length;
    const formattedTimestamp = new Date(user.metadata.creationTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });


    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen flex justify-center items-center w-full bg-light-secBg dark:bg-dark-secBg text-light-mainColor dark:text-dark-mainColor">
                <form className="w-9/12 sm:w-8/12 md:w-7/12 lg:w-5/12">
                    <div className="text-center w-20 h-20 font-bold text-2xl bg-gray-300 text-black rounded-full m-auto flex justify-center items-center">
                        {user && user.displayName.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_text">Name</label>
                        <input type="text" name="floating_text" id="floating_text" readOnly defaultValue={user.displayName} className="block p-1 w-full text-sm text-light-secColor dark:text-dark-secColor bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_email">Email</label>
                        <input type="email" name="floating_email" id="floating_email" readOnly defaultValue={user.email} className="block p-1 w-full text-sm text-light-secColor dark:text-dark-secColor bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_text2">Created at</label>
                        <input type="text" name="floating_text" id="floating_text2" readOnly defaultValue={formattedTimestamp} className="block p-1 w-full text-sm text-light-secColor dark:text-dark-secColor bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="floating_text3">Friends</label>
                        <input type="text" name="floating_text" id="floating_text3" readOnly value={numberOfFriends} className="block p-1 w-full text-sm text-light-secColor dark:text-dark-secColor bg-transparent border-0 border-b-2 border-gray-300  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;