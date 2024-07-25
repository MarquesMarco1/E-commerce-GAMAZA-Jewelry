import { useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    const response = await fetch(`${localhost}/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      navigate("/admin", { replace: true });
    } else {
      setError("Email already exists.");
    }
  };
  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmitRegister}
          className="w-1/2 flex flex-col items-center justify-center"
        >
          <label
            htmlFor="mail"
            className="block text-md font-primary font-bold leading-6 text-black"
          >
            Email :
          </label>
          <input
            type="email"
            placeholder=" Your email"
            className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="block text-md font-primary font-bold leading-6 text-black"
          >
            Password :
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          {error && <p>{error}</p>}
          <button className="w-3/4 p-3 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary">
            Register
          </button>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
