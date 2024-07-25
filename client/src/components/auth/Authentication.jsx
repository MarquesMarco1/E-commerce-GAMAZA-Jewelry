import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import { Link } from "react-router-dom";
import register from '../../assets/register.jpg';
import login from '../../assets/login.jpg';
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";

const Authentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    let navigate = useNavigate();


    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError("Email is invalid");
            return;
        }

        const formData = {
            email: email,
            password: password,
        };

        const response = await fetch(`${localhost}/api/authregister/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ formData }),
        });

        console.log(response);
        if (response.status === 200) {
            localStorage.setItem("user", email);
            navigate("/", { replace: true });
        } else {
            setError("Email already exists.");
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError("Email is invalid");
            return;
        }
        const formData = {
            email: email,
            password: password,
        };
        const response = await fetch(`${localhost}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ formData }),
        });
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem("user", email);
            navigate("/", { replace: true });
        } else {
            setError("Incorrect email or password.");
        }
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-4/5 bg-white shadow-lg rounded-lg">
                <div className={`absolute inset-0 flex transform transition-transform duration-500 ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                    <div className="mr-60 w-full flex items-center p-6">
                        <img src={login} alt="Login Image" className="w-1/2 rounded" />
                        <form onSubmit={handleSubmitLogin} className="w-1/2 flex flex-col items-center justify-center">
                            <h1 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
                                Login
                            </h1>
                            <div className="my-6 flex flex-wrap justify-center align-items space-between">
                                <span className="block text-md font-primary font-bold leading-6 text-black">Use your social networks accounts</span>
                                <Link to={`https://www.facebook.com/?locale=fr_FR`}>
                                    <img
                                        src={facebook}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Facebook that redirects to the Facebook's homepage"
                                    />
                                </Link>
                                <Link to={`https://x.com/?lang=fr`}>
                                    <img
                                        src={twitter}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Twitter that redirects to the Twitter's homepage"
                                    />
                                </Link>
                                <Link to={`https://www.instagram.com/`}>
                                    <img
                                        src={instagram}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Instagram that redirects to the Instagram's homepage"
                                    />
                                </Link>
                            </div>

                            <label htmlFor="mail"
                                className="block text-md font-primary font-bold leading-6 text-black">
                                Email :
                            </label>
                            <input type="email"
                                name="email"
                                placeholder="Your email"
                                className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="password"
                                className="block text-md font-primary font-bold leading-6 text-black">
                                Password :
                            </label>
                            <input type="password"
                                placeholder="Your password"
                                className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <a href="#" className="font-bold font-primary text-dark-purple hover:text-light-purple">
                                Forgot password?
                            </a>
                            <button className="w-3/4 p-3 text-3xl text-black font-bold rounded-lg bg-light-purple hover:bg-gold font-primary ">Login</button>
                            <p className="mt-4 cursor-pointer text-blue-500" onClick={() => setIsSignUp(true)}>You don't have an account?</p>
                        </form>
                        {error && <p>{error}</p>}
                    </div>
                </div>

                <div className={`absolute inset-0 flex transform transition-transform duration-500 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="ml-60 w-full flex items-center p-6">
                        <form onSubmit={handleSubmitRegister} className="w-1/2 flex flex-col items-center justify-center">
                            <h1 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
                                Register
                            </h1>
                            <div className="my-6 flex flex-wrap justify-center align-items space-between">
                                <span className="block text-md font-primary font-bold leading-6 text-black">Use your social networks accounts</span>
                                <Link to={`https://www.facebook.com/?locale=fr_FR`}>
                                    <img
                                        src={facebook}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Facebook that redirects to the Facebook's homepage"
                                    />
                                </Link>
                                <Link to={`https://x.com/?lang=fr`}>
                                    <img
                                        src={twitter}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Twitter that redirects to the Twitter's homepage"
                                    />
                                </Link>
                                <Link to={`https://www.instagram.com/`}>
                                    <img
                                        src={instagram}
                                        className="inline-flex justify-center items-center m-0 mx-1 h-10 w-10 rounded-full bg-[#adf0d1] border border-[rgba(0,32,63,.45)] transition-all duration-700 ease-in-out"
                                        alt="logo of Instagram that redirects to the Instagram's homepage"
                                    />
                                </Link>
                            </div>

                            <label htmlFor="mail"
                                className="block text-md font-primary font-bold leading-6 text-black">
                                Email :
                            </label>
                            <input type="email"
                                placeholder=" Your email"
                                className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <label htmlFor="password"
                                className="block text-md font-primary font-bold leading-6 text-black">
                                Password :
                            </label>
                            <input type="password"
                                placeholder="Password"
                                className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                required />
                            <a href="#" className="font-bold font-primary text-dark-purple hover:text-light-purple">
                                Forgot password?
                            </a>
                            <button className="w-3/4 p-3 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary">Register</button>
                            <p className="mt-4 cursor-pointer text-blue-500" onClick={() => setIsSignUp(false)}>You already have an account?</p>
                        </form>
                        <img src={register} alt="Register Image" className="w-1/2 rounded" />
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Authentication;