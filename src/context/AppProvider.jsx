import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
} from "firebase/auth";
import auth from "../../firebase.config";
import PropTypes from 'prop-types';
import { db } from "../../firebase.config";
import { doc, setDoc } from "firebase/firestore";


const AppContext = createContext();

function AppProvider({ children }) {

    const storedDarkMode = JSON.parse(localStorage.getItem('darkmode')) || false;
    const [isDarkMode, setIsDarkMode] = useState(storedDarkMode);
    const htmlElement = document.documentElement;
    useEffect(() => {
        if (isDarkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('darkmode', JSON.stringify(isDarkMode));
    }, [isDarkMode, htmlElement]);
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };


    const [isSideOpen, setIsSideOpen] = useState(true);
    const handleSidebar = () => {
        setIsSideOpen(!isSideOpen);
        const sidebar = document.querySelector(".sidebar");
        if (isSideOpen) {
            sidebar.classList.add("closed");
            sidebar.classList.remove("opened");
        } else {
            sidebar.classList.add("opened");
            sidebar.classList.remove("closed");
        }
    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        // Cleanup function to Unsubscribe from authentication state when changes
        return () => {
            unsubscribe();
        };
    }, []);

    const signup = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: username.charAt(0).toUpperCase() + username.slice(1) });
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                createdAt: user.metadata.createdAt,
            });
            await setDoc(doc(db, "userChats", user.uid), {});
        } catch (error) {
            console.error("Error during signup:", error);
            throw error;
        }
    };

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    }

    const reset = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const value = {
        user,
        signup,
        logIn,
        logOut,
        reset,
        toggleMode,
        isDarkMode,
        handleSidebar,
        isSideOpen,
    };

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AppContext);
}

export default AppProvider;





