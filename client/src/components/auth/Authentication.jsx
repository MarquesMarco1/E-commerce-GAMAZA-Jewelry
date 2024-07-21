import React, { useState } from 'react';
import login from '../../assets/login.jpg';
import register from '../../assets/register.jpg';

const Authentication = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-4/5 bg-white shadow-lg rounded-lg">
                <div className={`absolute inset-0 flex transform transition-transform duration-500 ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                    <div className="mr-60 w-full flex items-center p-6">
                        <img src={login} alt="Login Image" className="w-1/2" />
                        <form className="w-1/2 flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                            <input type="email" placeholder="Email" className="w-3/4 p-3 mb-4 border rounded" />
                            <input type="password" placeholder="Password" className="w-3/4 p-3 mb-4 border rounded" />
                            <button className="w-3/4 p-3 bg-purple-500 text-white rounded hover:bg-purple-600">Login</button>
                            <p className="mt-4 cursor-pointer text-blue-500" onClick={() => setIsSignUp(true)}>You doesn't have an account?</p>
                        </form>
                    </div>
                </div>

                <div className={`absolute inset-0 flex transform transition-transform duration-500 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="ml-60 w-full flex items-center p-6">
                        <form className="w-1/2 flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                            <input type="email" placeholder="Email" className="w-3/4 p-3 mb-4 border rounded" />
                            <input type="password" placeholder="Password" className="w-3/4 p-3 mb-4 border rounded" />
                            <button className="w-3/4 p-3 bg-purple-500 text-white rounded hover:bg-purple-600">Register</button>
                            <p className="mt-4 cursor-pointer text-blue-500" onClick={() => setIsSignUp(false)}>You already have an account?</p>
                        </form>
                        <img src={register} alt="Register Image" className="w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;