import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AppProvider";
import resetImg from "../assets/reset.svg"


function ResetPassword() {
    const emailRef = useRef();
    const { reset } = useAuth();
    const [error, setError] = useState("");
    const [successMsg, setsuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!emailRef.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return setError("Invalid email address. Please enter a valid email.");
        }
        try {
            setError("");
            setsuccessMsg("Reset email sent to your account. Check it to get new password");
            setLoading(true);
            await reset(emailRef.current.value);
        } catch (error) {
            setError("Cannot reset password now, try again later");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-light-mainBg dark:bg-dark-mainBg  text-light-mainColor dark:text-dark-mainColor">
            <div className="container min-h-screen flex flex-col md:flex-row justify-center items-center pb-12">
                <img src={resetImg} alt="signin" className="w-2/3 md:w-1/2" />
                <div className="w-full md:w-1/2  lg:w-2/5">
                    <h1 className="font-bold text-2xl text-center mb-6">Reset your Password</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    {successMsg && <h2 className="bg-[#d1e7dd] text-[#0f5132] w-full text-center mb-5 p-3 rounded-lg">{successMsg}</h2>}
                    <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="pb-1">Email</label>
                        <input type="email" name="email" id="email" className="input" placeholder="Enter your Email address" ref={emailRef} autoComplete="off"  required/>
                        <button type="submit" className="font-bold tracking-wide text-lg bg-light-blueColor hover:bg-[#3b82f6d1] text-light-mainBg rounded-md py-2 mt-6 mb-3" disabled={loading}>Reset</button>
                        <p className="text-sm">Back to ? <Link to="/signin" className="font-bold underline ">Sign in</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;

