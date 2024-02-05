import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAuth } from "./AppProvider";

const FriendsContext = createContext();

function FriendsProvider({ children }) {

    const [ chats, setAllChats ] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getChats = () => {
            if (user && user.uid) {
                const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                    setAllChats(doc.data());
                });
                return () => {
                    unsub();
                };
            }
        };
        getChats();
    }, [user]);


    return (
        <FriendsContext.Provider value={{ friendsChats : chats }}>
            {children}
        </FriendsContext.Provider>
    );
}


FriendsProvider.propTypes = {
    children: PropTypes.node.isRequired
};


// eslint-disable-next-line react-refresh/only-export-components
export function useFriends() {
    return useContext(FriendsContext);
}

export default FriendsProvider;
