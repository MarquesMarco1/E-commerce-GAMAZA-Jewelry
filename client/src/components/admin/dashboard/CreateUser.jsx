import { useState } from "react";
import { useNavigate } from "react-router-dom";

import localhost from "../../../config";

//////////////////
//  Components  //
//////////////////

import Header from "../../Header";
import Footer from "../../Footer";
import { useTranslation } from "react-i18next";

export default function CreateUser() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  ////////////////
  //  UseState  //
  ////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  ////////////////////
  //  HandleSubmit  //
  ////////////////////

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
            {t("editProfil.email")}
          </label>

          {/* Email */}

          <input
            type="email"
            placeholder={t("createUser.email")}
            className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            htmlFor="password"
            className="block text-md font-primary font-bold leading-6 text-black"
          >
            {t("editProfil.password")}
          </label>

          {/* Password */}

          <input
            type="password"
            placeholder={t("createUser.password")}
            className="w-3/4 p-3 mb-4 border border-gold rounded font-primary text-black bg-white "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          {/* Handle Error */}

          {error && <p>{error}</p>}

          {/* Submit button */}

          <button className="w-3/4 p-3 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary">
            {t("createUser.button")}
          </button>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
