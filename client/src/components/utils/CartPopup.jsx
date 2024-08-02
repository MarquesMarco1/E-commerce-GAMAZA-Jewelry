import React from 'react';
import { useTranslation } from "react-i18next";

const CartPopup = ({ show }) => {
  const { t } = useTranslation();

  if (!show) {
    return null;
  }

  return (
    <div className="absolute top-12 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg w-72 border border-gray-200 z-50 animate-fadeIn">
      <div className="text-lg font-semibold mb-4">{t("popup.basket")}</div>
      <div className="mb-2">{t("popup.articles")}</div>
      <div className="mb-4">{t("popup.totalPrice")}</div>
    </div>
  );
};

export default CartPopup;
