import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import Notfound from "./components/Notfound";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Users from "./components/Users";
import AppProvider from "./context/AppProvider";
import PrivateRoute from "./components/PrivateRoute";
import Signin from "./components/Signin";
import ChatProvider from "./context/ChatProvider";
import FriendsProvider from "./context/FriendsProvider";

function App() {

    return (
        <Router>
            <AppProvider>
                <FriendsProvider>
                    <ChatProvider>
                        <Routes>
                            <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
                            <Route path="profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
                            <Route path="users" element={<PrivateRoute> <Users /> </PrivateRoute>} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="signin" element={<Signin />} />
                            <Route path="resetPassword" element={<ResetPassword />} />
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                    </ChatProvider>
                </FriendsProvider>
            </AppProvider>
        </Router>
    );
}

export default App;
