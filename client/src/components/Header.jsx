import cart from "../assets/cart.svg";
import profile from "../assets/profile.svg";
import admin from "../assets/admin.svg";
import lotus from "../assets/lotus.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import localhost from "../config";
import Lang from "./utils/SwitchLangue";
import { useTranslation } from "react-i18next";
import Switch from "./utils/Switch";
import CartPopup from "./utils/CartPopup";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="bg-light-purple bg-opacity-20 h-auto md:h-24 p-4 md:p-6 md:px-24 mb-4 md:mb-0">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to={`/`} className="flex items-center">
          <img
            src={lotus}
            className="w-16 h-16 md:w-24 md:h-24"
            alt="logo of a lotus that redirect to the landing/home page"
      />
      <h1 className="text-gold font-primary font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ml-4">
        G.A.M.A.Z.A .Co
      </h1>
      </Link>
      {/* <div className="flex flex-col space-x-4 md:flex-row items-center md:mr-24 space-y-4 md:space-y-0 md:space-x-8"> */}
      <div className="flex items-center space-x-4">
      <Switch/>
      <Lang />
      <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
      >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-8`}
        >
          <Link to={`/`} className="block md:inline-block mt-4 md:mt-0">
            {t("header.home")}
          </Link>
          <Link to={`/about`} className="block md:inline-block mt-4 md:mt-0">
            {t("header.about")}
          </Link>
          <Link to={`/services`} className="block md:inline-block mt-4 md:mt-0">
            {t("header.services")}
          </Link>
          <Link to={`/contact`} className="block md:inline-block mt-4 md:mt-0">
            {t("header.contact")}
          </Link>
          <div className="relative group">
            <Link to={`/profile`} className="flex items-center mt-4 md:mt-0">
              <img
                src={profile}
                className="w-8 h-8 md:w-12 md:h-12"
                alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
              />
              <span className="hidden md:block text-2xl text-gold font-primary font-extrabold ml-2">
                {t("header.profile")}
              </span>
            </Link>
          
            {/* <Link to={`/profile`} className="flex items-center">
              <img
                src={profile}
                className="mr-2 md:mr-8"
                alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
              />
              <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                {t("header.profile")}
              </span>
            </Link> */}
            {isAdmin && (
            <Link to={`/admin`} className="flex items-center mt-4 md:mt-0">
              <img
                src={admin}
                className="w-8 h-8 md:w-12 md:h-12"
                alt="logo of an admin that redirect to your dashboard and the edition or suppression of some products"
              />
                <span className="hidden md:block text-2xl text-gold font-primary font-extrabold ml-2">
                {t("header.admin")}
              </span>
            </Link>
          )}
          </div>
        <div
          className="relative group mt-4 md:mt-0"
          onMouseEnter={() => setShowCartPopup(true)}
          onMouseLeave={() => setShowCartPopup(false)}
        >
          <Link to={`/cart`} className="flex items-center">
            <img
              src={cart}
              className="w-8 h-8 md:w-12 md:h-12"
              alt="logo of a cart that redirect to your cart and the finalization of your order"
            />
              <span className="hidden md:block text-2xl text-gold font-primary font-extrabold ml-2">
              {t("header.cart")}
            </span>
          </Link>
            <CartPopup show={showCartPopup} cartItems={cartItems} />
          </div>
        </nav>
      </div>
    </header>
  );
}
