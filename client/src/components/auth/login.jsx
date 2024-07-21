import { useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

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
    const response = await fetch(`${localhost}/api/auth/login`, {
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
      setError("Incorrect email or password.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="mail">Email</label>
        <input
          type="mail"
          name="mail"
          id="mail"
          placeholder="adresse mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="submit">
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
