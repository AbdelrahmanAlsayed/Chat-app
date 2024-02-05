import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../context/AppProvider";
import auth from "../../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import signUpImg from "../assets/signup.svg";


function Signup() {
    const nameRef = useRef("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, user } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    async function handleSignup(event) {
        event.preventDefault();

        if (!emailRef.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return setError("Invalid email address. Please enter a valid email.");
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match !");
        }
        if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
            return setError("Password must be at least 6 characters!");
        }
        if (nameRef.current.value == "") {
            return setError("Name is not valid");
        }
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
            navigate("/signin");
        } catch (error) {
            console.error("Error adding document: ", error);
            setError("Failed to create an account !");
        } finally {
            setLoading(false);
        }
    }

    async function SignupWithGoogle(event) {
        event.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            navigate("/");

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                createdAt: user.metadata.createdAt,
            });
            await setDoc(doc(db, "userChats", user.uid), {});
        } catch (error) {
            setError("Failed to create an account !");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-light-mainBg dark:bg-dark-mainBg  text-light-mainColor dark:text-dark-mainColor">
            <div className="container min-h-screen gap-x-10 flex flex-col md:flex-row justify-center items-center pb-12">
                <img src={signUpImg} alt="signup" className="w-full md:w-1/2" />
                <div className="w-full md:w-1/2  lg:w-2/5">
                    <h1 className="font-bold text-3xl text-center mb-6">Become a member !</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    <form className="flex flex-col flex-1" onSubmit={handleSignup}>
                        <label htmlFor="name" className="pb-1">Name</label>
                        <input type="text" name="name" id="name" className="input" placeholder="Enter your name " ref={nameRef} required autoComplete="off" />
                        <label htmlFor="email" className="pb-1">Email</label>
                        <input type="email" name="email" id="email" className="input" placeholder="Enter your Email address" ref={emailRef} required  autoComplete="off" />
                        <label htmlFor="password" className="pb-1">Password</label>
                        <input type="password" name="password" id="password" className="input" placeholder="Enter your password" ref={passwordRef} required autoComplete="off" />
                        <label htmlFor="passwordConfirm" className="pb-1">Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" className="input" placeholder="Confirm your password" ref={passwordConfirmRef} required  autoComplete="off" />
                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t dark:border-dark-border"></div>
                            <span className="flex-shrink mx-4 text-gray-400">OR</span>
                            <div className="flex-grow border-t dark:border-dark-border"></div>
                        </div>
                        <div className="flex justify-center items-center gap-8">
                            <button className="icon" onClick={SignupWithGoogle} >
                                <FcGoogle />
                            </button>
                            <button className="icon" onClick={SignupWithGoogle}>
                                <FaApple />
                            </button>
                        </div>
                        <button type="submit" disabled={loading} className="font-bold tracking-wide text-lg bg-light-blueColor hover:bg-[#3b82f6d1] text-light-mainBg rounded-md py-2 mt-6 mb-3">Create an Account</button>
                        <p className="text-sm">Already have an account ? <Link to="/signin" className="font-bold underline ">Sign in</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;

