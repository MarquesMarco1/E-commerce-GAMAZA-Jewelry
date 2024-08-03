import cart from "../assets/cart.svg";
import profile from "../assets/profile.svg";
import admin from "../assets/admin.svg";
import lotus from "../assets/lotus.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import localhost from "../config";
import Lang from "./utils/SwitchLangue";
import { useTranslation } from "react-i18next";
import CartPopup from "./utils/CartPopup";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const { t } = useTranslation();

  const email = localStorage.getItem("user");
  const cartItems = [
    { id: 1, name: "Article 1", quantity: 2, price: 10 },
    { id: 2, name: "Article 2", quantity: 1, price: 20 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    fetchData();
  }, [isAdmin, email]);

  return (
    <header className="w-full flex flex-col sm:m-2 md:flex-row items-center justify-between bg-light-purple bg-opacity-20 h-auto md:h-24 p-4 md:p-6 md:px-24 mb-4 md:mb-0">
      <Link to={`/`}>
        <img
          src={lotus}
          className="w-24 h-24 md:w-32 md:h-32"
          alt="logo of a lotus that redirect to the landing/home page"
        />
      </Link>
      <Lang />
      <h1 className="text-gold font-primary font-bold font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center flex-grow md:mx-4">
        G.A.M.A.Z.A .Co
      </h1>
      <div className="flex flex-col space-x-4 md:flex-row items-center md:mr-24 space-y-4 md:space-y-0 md:space-x-8">
        {isAdmin ? (
          <>
            <Link to={`/profile`} className="flex items-center">
              <img
                src={profile}
                className="mr-2 md:mr-8"
                alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
              />
              <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                {t("header.profile")}
              </span>
            </Link>
            <Link to={`/admin`} className="flex items-center">
              <img
                src={admin}
                className="mr-2 md:mr-8"
                alt="logo of an admin that redirect to your dashboard and the edition or suppression of some products"
              />
              <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                {t("header.admin")}
              </span>
            </Link>
          </>
        ) : (
          <Link to={`/profile`} className="flex items-center">
            <img
              src={profile}
              className="mr-2 md:mr-8"
              alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
            />
            <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
              {t("header.profile")}
            </span>
          </Link>
        )}

        <div
          className="relative"
          onMouseEnter={() => setShowCartPopup(true)}
          onMouseLeave={() => setShowCartPopup(false)}
        >
          <Link to={`/cart`} className="flex items-center">
            <img
              src={cart}
              className="mr-2 md:mr-8"
              alt="logo of a cart that redirect to your cart and the finalization of your order"
            />
            <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
              {t("header.cart")}
            </span>
          </Link>
          <CartPopup show={showCartPopup} cartItems={cartItems} />
        </div>
      </div>
    </header>
  );
}
