import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import Login from './login';
import Register from './register';
import register from '../../assets/register.jpg';
import { Link } from "react-router-dom";
import login from '../../assets/login.jpg';
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";

export default function Authentication() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isActive, setIsActive] = useState(false);
    let navigate = useNavigate();


    const handleToggle = () => {
        setIsActive(!isActive);
    }

    const handleSubmit = async (e) => {
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

    const response = await fetch(`${localhost}/api/auth/register`, {
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

    return (
        <div className={`relative overflow-hidden min-h-[480px] w-[768px] max-w-full bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,32,63,.45),0_8px_8px_rgba(0,32,63,.45)] ${isActive ? 'panel-active' : ''}`}>
            {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm left-0 w-1/2 opacity-0 z-10 "> */}
            <div className={`absolute top-0 left-0 h-full w-1/2 transition-opacity duration-600 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-20'}`}>
            <form onSubmit={handleSubmit} className="p-10">
                <h1 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
                    Register
                </h1>
                <div className="my-6 flex justify-center align-items space-between">
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
                <span className="block text-md font-primary font-bold leading-6 text-black">Use your social networks accounts</span>

                
                    <label htmlFor="mail"
                        className="block text-md font-primary font-bold leading-6 text-black">
                        Email
                    </label>
                    <input
                        type="mail"
                        name="mail"
                        placeholder="Your email"
                        className="block w-full rounded-lg py-1.5 text-gold border-2 border-gold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
                
                    <label htmlFor="password"
                        className="block text-sm font-medium leading-6 text-black">Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 border-gold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <a href="#" className="font-medium font-primary text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>

                    <button type="submit" 
                        className="flex w-full justify-center rounded-md bg-light-purple px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        id="submitForm">Create your account
                    </button>
                </form>
                {error && <p>{error}</p>}
            </div>

            {/* Login  */}
            {/* <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20"> */}
            <div className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-600 ease-in-out ${isActive ? 'translate-x-full z-20' : 'translate-x-0 z-20'}`}>
            <form onSubmit={handleSubmit}
                    className="" 
                    id="loginForm">
                <h1 className="mt-10 text-center text-2xl font-bold font-primary leading-9 tracking-tight text-gold">Login</h1>
                <div className="my-6 flex justify-center align-items space-between">
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
                <span className="block text-md font-primary font-bold leading-6 text-black">Use your social networks accounts</span>

                    <label htmlFor="mail"
                        className="block text-md font-primary font-bold leading-6 text-gold">
                        Email
                    </label>
                    <input
                        type="mail"
                        name="mail"
                        placeholder="Your email"
                        className="block w-full font-primary font-bold rounded-lg border-2 py-1.5 border-gold shadow-sm placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password"
                        className="block text-sm rounded-lg font-bold font-primary leading-6 text-gold">Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        className="block w-full font-primary font-bold rounded-lg border-2 py-1.5 border-gold shadow-sm placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <a href="#" className="font-medium font-primary text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>

                    <button type="submit" 
                        className="flex w-full justify-center rounded-lg bg-light-purple px-4 py-1.5 text-md font-semibold leading-6 text-black shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        id="submit">Log In
                    </button>
                    {error && <p>{error}</p>}
                    </form>
                </div>
        {/* Overlay Container  */}
            {/* <div className="absolute flex items-center justify-center flex-col p-0 px-10 text-center top-0 h-full w-1/2 transform translate-x-0 transition-transform duration-600 ease-in-out -transform translate-1/5">
                <div className="relative h-full w-[200%] -left-full bg-white text-gold transition-transform duration-600 ease-in-out transform translate-x-0">
                    <div className="absolute flex items-center justify-center flex-col px-10 py-0 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out -transform -translate-x-1/5">                  */}
                
                <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                    <div className={`absolute top-0 left-1/2 w-[100%] h-full transition-transform duration-600 ease-in-out ${isActive ? 'transform translate-x-0' : 'transform translate-x-20p'}`}>
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-white">
                          <div className={`absolute top-0 left-0 h-full w-full transition-transform duration-600 ease-in-out ${isActive ? 'transform translate-x-0' : 'transform translate-x-100n'}`}>


                        <h1 className=' text-2xl font-primary font-bold text-gold '>Welcome back !</h1>
                                <p className='font-primary font-bold text-gold '>To keep connected with us, please login with your personal info.</p>
                                <img src={login} 
                                alt="little lady delighted" 
                                className="mx-auto h-auto w-auto"/>
                                {/* <button className="bg-transparent flex w-full justify-center rounded-md bg-light-purple px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"  */}
                                <button className="mt-4 bg-light-purple px-6 py-2 text-white rounded-lg hover:bg-gold"
                                id="login" 
                                type="button"
                                onClick={handleToggle}>
                                Log In
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white">
                            <div className={`absolute top-0 right-0 h-full w-full transition-transform duration-600 ease-in-out ${isActive ? 'transform translate-x-100n' : 'transform translate-x-0'}`}>
                            <h1 className=" text-2xl font-primary font-bold text-gold">Join us in an adventure full of magic and elegance.</h1>
                                    <p className='font-primary font-bold text-gold '>Enter your personal details and start your journey with  us.</p>
                                    <img src={register} 
                                    alt="little lady wearing our jewelry"
                                    className="mx-auto h-auto w-auto" 
                                    />            

                                    {/* <button className="p-4 mt-6 tracking-wide transition duration-200 ease-in bg-transparent flex w-full justify-center rounded-md bg-light-purple bg-opacity-20 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"  */}
                                    <button className="mt-4 bg-light-purple px-6 py-2 text-white rounded-lg hover:bg-gold"
                                    id="signUp"
                                    type="button"
                                    onClick={handleToggle}>
                                    Create your account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            );
        };
