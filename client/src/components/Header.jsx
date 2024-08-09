import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import localhost from "../config";
import { useTranslation } from "react-i18next";
import CartPopup from "./utils/CartPopup";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [active, setActive] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const navigate = useNavigate();

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
  }, [email]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageSelect(false);
  };

  const Menus = [
    { name: t("header.home"), icon: homeOutline, path: "/", dis: "translate-x-0" },
    { name: t("header.profile"), icon: personOutline, path: "/profile", dis: "translate-x-16" },
    isAdmin && { name: t("header.admin"), icon: personCircleOutline, path: "/admin", dis: "translate-x-32" },
    { name: t("header.cart"), icon: cartOutline, path: "/cart", dis: "translate-x-48" },
    {
      name: darkMode ? t("header.lightmode") : t("header.darkmode"),
      icon: darkMode ? sunnyOutline : moonOutline,
      dis: "translate-x-64",
      action: toggleDarkMode,
    },
    {
      name: t("header.language"),
      icon: globeOutline,
      dis: "translate-x-80",
      action: () => setShowLanguageSelect(!showLanguageSelect),
      showLanguageSelect,
      languageOptions: ["en", "fr", "es"],
    },
  ].filter(Boolean);

  const handleMenuClick = (i, path, action) => {
    setActive(i);
    if (action) {
      action();
    }
    setTimeout(() => {
      if (path) {
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
    <header className="">
      <div className="flex justify-between items-center">
        <div onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <img
            src={lotus}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
            alt="Logo de G.A.M.A.Z.A. Co"
          />
          <h1 className="text-gold text-center font-primary font-extrabold text-xl md:text-3xl lg:text-4xl xl:text-5xl ml-2">
            G.A.M.A.Z.A. Co
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <div onClick={() => handleMenuClick(Menus.length - 2, null, toggleDarkMode)} className="cursor-pointer">
            <IonIcon
              icon={darkMode ? sunnyOutline : moonOutline}
              className="text-2xl md:text-3xl hover:scale-110 transition duration-300"
            />
          </div>
          {/* Language Selector */}
          <div className="relative">
            <IonIcon
              icon={globeOutline}
              className="text-2xl md:text-3xl cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => setShowLanguageSelect(!showLanguageSelect)}
            />
            {showLanguageSelect && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                {Menus[Menus.length - 1].languageOptions.map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-auto flex justify-center items-center bg-light-purple bg-opacity-20 max-h-[4.4rem] px-6 rounded-t-xl w-full overflow-x-auto">
      <ul className="flex relative flex-wrap">
          {Menus[active] && (
            <span
              className={`bg-light-purple dark:bg-dark-purple duration-500 ${Menus[active].dis} border-4 border-grey h-16 w-16 absolute -top-5 rounded-full`}
            >
              <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
              <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
            </span>
          )}

          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              <button
                className="flex flex-col text-center pt-6"
                onClick={() => handleMenuClick(i, menu.path, menu.action)}
              >
                <span
                  className={`text-xl md:text-2xl cursor-pointer duration-500 font-primary ${
                    i === active && "-mt-6 text-white"
                  }`}
                >
                  <IonIcon icon={menu.icon} />
                </span>
                <span
                  className={`${
                    active === i
                      ? "translate-y-4 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  {menu.name}
                </span>
              </button>
              {menu.name === t("header.cart") && showCartPopup && <CartPopup cartItems={cartItems} />}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
