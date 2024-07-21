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
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="">
                  <img
                    src={register}
                    alt="little lady wearing our jewelry"
                    className=""
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="font-primary text-gold text-6xl"
                  >
                    Register
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {/* EMAIL */}
                      <div className="flex w-full">
                        <label htmlFor="mail" className="font-primary text-4xl">
                          Email :
                        </label>
                        <input
                          type="mail"
                          name="mail"
                          id="mail"
                          className="border-gold border-2 rounded-full h-8 mt-2 ml-4 p-1.5"
                          placeholder=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                   
                      <div className="flex w-full">
                        <label
                          htmlFor="password"
                          className="font-primary text-4xl"
                        >
                          Password:
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="border-gold border-2 rounded-full h-8 mt-2 ml-4 p-1.5"
                          placeholder=""
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        id="submit"
                        className="rounded-3xl bg-dark-purple/20 mt-4"
                      >
                        <p className="font-primary text-5xl p-4">Register</p>
                      </button>
                    </form>
                    {error && <p>{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
