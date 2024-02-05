import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";
import { useAuth } from "../context/AppProvider";
import siginInImg from "../assets/signin.svg"



function Signin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { logIn } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    async function handleSubmit(event) {
        event.preventDefault();
        if (!emailRef.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return setError("Invalid email address. Please enter a valid email.");
        }
        try {
            setError("");
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            setError("Email or password is incorrect !");
        } finally {
            setLoading(false);
        }
    }


    async function SigninWithGoogle(event) {
        event.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            setError("Failed to create an account !");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-light-mainBg dark:bg-dark-mainBg  text-light-mainColor dark:text-dark-mainColor">
            <div className="container min-h-screen flex flex-col md:flex-row justify-center items-center pb-12">
                <img src={siginInImg} alt="signin" className="w-full md:w-3/5" />
                <div className="w-full md:w-1/2  lg:w-2/5">
                    <h1 className="font-bold text-3xl text-center mb-6">Welcome Back !</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="pb-1">Email</label>
                        <input type="email" name="email" id="email" className="input" placeholder="Enter your Email address" required ref={emailRef} autoComplete="off" />
                        <label htmlFor="password" className="pb-1">Password</label>
                        <input type="password" name="password" id="password" className="input" placeholder="Enter your password" required ref={passwordRef} autoComplete="off" />
                        <Link to="/resetPassword" className="text-gray-500 underline text-xs tracking-wide ">
                            Forgot your password ?
                        </Link>
                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t dark:border-dark-border"></div>
                            <span className="flex-shrink mx-4 text-gray-400">OR</span>
                            <div className="flex-grow border-t dark:border-dark-border"></div>
                        </div>
                        <div className="flex justify-center items-center gap-8">
                            <button className="icon" onClick={SigninWithGoogle} >
                                <FcGoogle />
                            </button>
                            <button className="icon" onClick={SigninWithGoogle}>
                                <FaApple />
                            </button>
                        </div>
                        <button type="submit" className="font-bold tracking-wide text-lg bg-light-blueColor hover:bg-[#3b82f6d1] text-light-mainBg rounded-md py-2 mt-6 mb-3" disabled={loading}>Log in</button>
                        <p className="text-sm">Don&#39;t have an account ? <Link to="/signup" className="font-bold underline ">Sign up</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin;
