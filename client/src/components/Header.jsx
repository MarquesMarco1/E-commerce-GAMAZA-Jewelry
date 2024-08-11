import React, { useState, useEffect, useContext } from "react";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  personOutline,
  personCircleOutline,
  cartOutline,
  globeOutline,
  moonOutline,
  sunnyOutline,
} from "ionicons/icons";
import lotus from "../assets/lotus.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import CartPopup from "./utils/CartPopup";
import { useCart } from "../CartContext";
import NotificationBadge from "./NotificationBadge";
import AuthPopup from "./utils/AuthPopup";
import { LanguageContext } from "../LanguageContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [active, setActive] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { state: cart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const { language, changeLanguage } = useContext(LanguageContext);

  const email = localStorage.getItem("user");
  const cartItems = cart;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const setLanguage = (lng) => {
    changeLanguage(lng);
    i18n.changeLanguage(lng.toLowerCase());
    setShowLanguageSelect(false);
  };

  const handleCartClick = () => {
    if (email) {
      navigate("/cart");
    } else if (location.pathname !== "/cart") {
      setShowAuthPopup(true);
    }
  };

  const Menus = [
    {
      name: t("header.home"),
      icon: homeOutline,
      path: "/",
      dis: "translate-x-0",
    },
    {
      name: t("header.profile"),
      icon: personOutline,
      path: "/profile",
      dis: "translate-x-16",
    },
    isAdmin && {
      name: t("header.admin"),
      icon: personCircleOutline,
      path: "/admin",
      dis: "translate-x-32",
    },
    {
      name: darkMode ? t("header.lightmode") : t("header.darkmode"),
      icon: darkMode ? sunnyOutline : moonOutline,
      dis: "translate-x-48",
      action: toggleDarkMode,
      hideOnMobile: true,
    },
    {
      name: t("header.languages"),
      icon: globeOutline,
      dis: "translate-x-64",
      action: () => setShowLanguageSelect(!showLanguageSelect),
      showLanguageSelect,
      languageOptions: ["en", "fr"],
      hideOnMobile: true,
    },
    {
      name: t("header.cart"),
      icon: cartOutline,
      path: "/cart",
      dis: "translate-x-80",
      action: handleCartClick,
      hasBadge: true,
    },
  ].filter(Boolean);

  const handleMenuClick = (i, path, action) => {
    setActive(i);
    if (action) {
      action();
    }
    setTimeout(() => {
      if (
        path &&
        i !== Menus.findIndex((menu) => menu.name === t("header.cart"))
      ) {
        navigate(path);
      }
    }, 300);
  };

  const handleLogoClick = () => {
    setActive(0);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <>
      <header className="relative bottom-0 md:top-0 w-full bg-light-purple dark:bg-dark-purple px-6 rounded-t-xl md:rounded-b-none mb-6">
        <div
          onClick={handleLogoClick}
          className="flex flex-col justify-center items-center md:flex-row md:justify-center md:px-10 mb-6"
        >
          <img
            src={lotus}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
            alt="Logo de G.A.M.A.Z.A. Co"
          />
          <h1 className="text-gold text-center font-primary font-extrabold text-xl md:text-3xl lg:text-4xl xl:text-5xl ml-2">
            G.A.M.A.Z.A. Co
          </h1>
        </div>
        {/* <div className="flex justify-end items-center space-x-4 mb-4 md:mb-0"> */}
        {/* Dark Mode Toggle */}
        {/* <div onClick={() => handleMenuClick(Menus.length - 2, null, toggleDarkMode)} className="cursor-pointer"> */}
        {/* <IonIcon */}
        {/* icon={darkMode ? sunnyOutline : moonOutline} */}
        {/* className="text-2xl md:text-3xl hover:scale-110 transition duration-300" */}
        {/* /> */}
        {/* </div> */}
        {/* Language Selector
          <div className="relative">
            <IonIcon
              icon={globeOutline}
              className="text-2xl md:text-3xl cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => setShowLanguageSelect(!showLanguageSelect)}
            />
            {showLanguageSelect && (
              <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                {Menus[Menus.length - 1].languageOptions.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-light-purple"
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div> */}

        {/* NavBar  */}
        <div className="bg-white dark:bg-light-purple max-w-fit mx-auto flex justify-center px-6 rounded-t-xl max-h-[5.4rem]">
          <ul className="flex relative items-center">
            {Menus[active] && (
              <span
                className={`bg-dark-purple dark:bg-dark-mode-light-purple duration-500 
                  ${Menus[active].dis} border-4 border-light-purple dark:border-dark-purple
                  h-16 w-16 absolute -top-5 left-[-1.2rem] rounded-full`}
              >
                <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1 dark:shadow-myShadow3"></span>
                <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2 dark:shadow-myShadow4"></span>
              </span>
            )}

            {Menus.map((menu, i) => (
              <li
                key={i}
                className={`relative w-16 ${
                  menu.hideOnMobile ? "hidden md:block" : ""
                }`}
              >
                <button
                  className="flex flex-col text-center pt-6"
                  onClick={() => handleMenuClick(i, menu.path, menu.action)}
                  onMouseEnter={
                    menu.name === t("header.cart")
                      ? () => setShowCartPopup(true)
                      : null
                  }
                  onMouseLeave={
                    menu.name === t("header.cart")
                      ? () => setShowCartPopup(false)
                      : null
                  }
                >
                  <span
                    className={`text-xl md:text-2xl cursor-pointer duration-500 font-primary ${
                      i === active &&
                      "mt-[-2.5rem] text-gold font-primary font-extrabold"
                    }`}
                  >
                    {/* Logic Cart  */}
                    {menu.hasBadge ? (
                      <>
                        <IonIcon icon={cartOutline} />
                        <NotificationBadge count={cartItemCount} />
                      </>
                    ) : (
                      <IonIcon icon={menu.icon} />
                    )}
                  </span>

                  <span
                    className={`text-gold font-primary font-extrabold items-center justify-center ${
                      active === i
                        ? "translate-y-4 duration-700 opacity-100"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {menu.name}
                  </span>
                </button>
                {menu.name === t("header.languages") && showLanguageSelect && (
                  <div className="absolute left-0 mt-4 w-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                    {menu.languageOptions.map((lng) => (
                      <button
                        key={lng}
                        onClick={() => setLanguage(lng)}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-light-purple"
                      >
                        {lng.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
                {menu.name === t("header.cart") && showCartPopup && (
                  <CartPopup show={showCartPopup} cartItems={cartItems} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </header>
      {showAuthPopup && !email && (
        <AuthPopup onClose={() => setShowAuthPopup(false)} />
      )}
    </>
  );
}
