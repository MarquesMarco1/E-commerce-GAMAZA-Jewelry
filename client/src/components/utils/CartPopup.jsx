import React from 'react';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useCart } from "../../CartContext";

const CartPopup = ({ show }) => {
  const { t } = useTranslation();
  const [nbrArticle, setNbrArticle] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const { state: cart, dispatch } = useCart([]);

  useEffect(() => {
    SetNbrArticle();
    SetSubTotal();
}, [cart]);

  const SetNbrArticle = () => {
    let nbr = 0;
    cart.map((item) => (nbr += item.itemQty));
    setNbrArticle(nbr);
};

const SetSubTotal = () => {
  let total = 0;
  cart.map(
      (item) =>
      (total +=
          item.product.price * item.itemQty -
          (
              item.product.price *
              item.itemQty *
              ((item.product.promotion.id != 1
                  ? item.product.promotion.pourcentage
                  : 0) /
                  100)
          ).toFixed())
  );
  setSubTotal(total);
};


  if (!show) {
    return null;
  }

  return (
      <div className="absolute top-12 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg w-72 border border-gray-200 z-50 animate-fadeIn">
      <div className="text-lg font-semibold mb-4">{t("popup.basket")}</div>
      <div className="mb-2">{t("popup.articles")}&nbsp;{nbrArticle}</div>
      <div className="mb-4">{t("popup.subPrice")}&nbsp;{subTotal}€</div>
    </div>
  );
};

export default CartPopup;
