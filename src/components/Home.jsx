import Chats from "./Chats";
import Sidebar from "./Sidebar";

function Home() {

    return (
        <div className="flex">
            <Sidebar />
            <Chats />
        </div>
    )
}

export default Home;
