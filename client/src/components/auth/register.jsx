"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import register from "../../assets/register.jpg";
import localhost from "../../config";
import register from '../../assets/register.jpg';

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [open, setOpen] = useState(true);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
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
    if (response.status === 200) {
      localStorage.setItem("user", email);
      navigate("/", { replace: true });
    } else {
      setError("Email already exists.");
    }
  };

  return (
    // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="relative overflow-hidden min-h-[480px] w-[768px] max-w-full bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,32,63,.45),0_8px_8px_rgba(0,32,63,.45)]">
        <img src={register} 
        alt="little lady wearing our jewelry" 
        className="mx-auto h-auto w-auto"
        />
        <h2 className="mt-10 text-center font-primary text-2xl font-bold leading-9 tracking-tight text-gold">
        Register
        </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <div class="absolute top-0 h-full transition-all duration-600 ease-in-out"> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>

        <label htmlFor="mail"
        className="block text-md font-primary font-bold leading-6 text-black">
          Email
        </label>
        
        <div className="mt-2">
        <input
          type="mail"
          name="mail"
          id="mail"
          placeholder="Your email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 border-gold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
        <label htmlFor="password"
        className="block text-sm font-medium leading-6 text-black">Password
        </label>
        <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 border-gold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gold sm:text-sm sm:leading-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
    </div>
    <div>
        <button type="submit"
                className="flex w-full justify-center rounded-md bg-light-purple px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                id="submit">
          Create your account
        </button>
      </div>
      </form>
      {error && <p>{error}</p>}
    </div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      Test
    </div>
  </div>
  );
}
