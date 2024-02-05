import { Link } from "react-router-dom";
import notFoundImg from "../assets/notfound.svg";

function Notfound() {
    return (
        <div className="bg-light-mainBg dark:bg-dark-mainBg  text-light-mainColor dark:text-dark-mainColor">
            <div className="container min-h-screen flex flex-col justify-center items-center ">
                <img src={notFoundImg} alt="Not found" className="w-full md:w-7/12 lg:w-2/5" />
                <p className="text-center mb-5">Sorry, We can&#39;t seem to find the page you&#39;re looking for.</p>
                <Link to="/" className="input hover:bg-blue-600 dark:hover:bg-blue-600 duration-200 bg-light-blueColor dark:bg-light-blueColor  dark:text-dark-mainColor text-light-mainBg">Go Home</Link>
            </div>
        </div>
    )
}

export default Notfound;
