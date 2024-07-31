import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

export default function StockAlert({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      onSubmit(email);
      setEmail("");
      setError("");
      onClose();
    } else {
      setError("Please enter a valid email address.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg mb-4">{t("stockAlert.notify")}</h2>
        <input
          type="email"
          placeholder={t("stockAlert.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {error && <p className="text-red text-sm mb-4">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-grey text-black rounded"
          >
            {t("stockAlert.cancel")}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gold text-white rounded"
          >
            {t("stockAlert.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
