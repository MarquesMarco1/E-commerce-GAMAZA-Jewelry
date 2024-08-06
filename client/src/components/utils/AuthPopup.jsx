import { useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import { useTranslation } from "react-i18next";

const AuthPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    const response = await fetch(`${localhost}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (response.status === 200) {
      localStorage.setItem("user", email);
      navigate("/", { replace: true });
      onClose();
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{t('auth.login')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{t('auth.login')}</button>
        </form>
        {error && <p>{error}</p>}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default AuthPopup;
