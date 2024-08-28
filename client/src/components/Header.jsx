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
  searchOutline,
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
import Switch from "./utils/Switch";
import Lang from "./utils/SwitchLangue";
import Search from "./Search";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [active, setActive] = useState(0);
  // const [previousActive, setPreviousActive] = useState();
  // const [darkMode, setDarkMode] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { t, i18n } = useTranslation();
  // const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { state: cart } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const { language, changeLanguage } = useContext(LanguageContext);

  const email = localStorage.getItem("user");
  const cartItems = cart;

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
    // {
    //   name: t("header.searchBar"),
    //   icon: searchOutline,
    //   action: () => setShowSearchBar(!showSearchBar),
    //   // path: "/profile",
    //   // dis: "translate-x-16",
    // },
    {
      name: t("header.cart"),
      icon: cartOutline,
      path: "/cart",
      dis: "translate-x-48",
      action: handleCartClick,
    },
  ].filter(Boolean);

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

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  useEffect(() => {
    let nbr = 0;
    cartItems.map((item) => (nbr += item.itemQty));
    setCartItemCount(nbr);
  }, [cartItems]);

  // const setLanguage = (lng) => {
  //   changeLanguage(lng);
  //   i18n.changeLanguage(lng.toLowerCase());
  //   setShowLanguageSelect(false);
  // };

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const activeMenuIndex = Menus.findIndex(
  //     (menu) => menu.path === currentPath
  //   );
  //   if (activeMenuIndex !== -1) {
  //     // setPreviousActive(active);
  //     setActive(activeMenuIndex);
  //   }
  // }, [location.pathname, Menus]);

  const handleMenuClick = (i, path, action) => {
    // setPreviousActive(active);
    setActive(i);
    if (action) {
      action();
    }
    if (path) {
      navigate(path);
    }
  };
  // const toggleSearchBar = () => {
  //   setShowSearchBar(!showSearchBar);
  // };

  // const handleLogoClick = () => {
  //   setPreviousActive(active);
  //   setActive(0);
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 300);
  // };

  // const AnimationNav = (index) => {
  //   const direction = index > active ? "translate-x" : "-translate-x";
  //   switch (index) {
  //     case 0:
  //       return `${direction}-0`;
  //     case 1:
  //       return `${direction}-16`;
  //     case 2:
  //       return `${direction}-32`;
  //     case 3:
  //       return `${direction}-48`;
  //     // case 4:
  //     // return `${direction}-64`;
  //     default:
  //       return `${direction}-0`;
  //   }
  // };

  return (
    <>
      <header className="relative bottom-0 md:top-0 w-full bg-light-purple dark:bg-dark-mode-purple px-6 rounded-t-xl md:rounded-b-none shadow-md p-4">
        <div
          // onClick={handleLogoClick}
          className="flex flex-col justify-left md:flex-row md:justify-left md:px-10 mb-2"
        >
          <img
            src={lotus}
            className="w-20 h-20"
            alt="Logo de G.A.M.A.Z.A. Co"
          />
          <h1 className="text-gold text-left font-primary font-extrabold text-xl md:text-3xl lg:text-4xl xl:text-5xl ml-2">
            G.A.M.A.Z.A. Co
          </h1>
          <div className="flex justify-end">
            <Switch />
            {language && <Lang />}
            {/* <Lang /> */}
            {/* <Search /> */}
          </div>
        </div>
        {/* NavBar  */}
        <div className="bg-white dark:bg-light-purple max-w-fit mx-auto flex justify-center px-6 rounded-t-xl max-h-[4.4rem]">
          <ul className="flex relative items-center">
            {Menus[active] && (
              <span
                className={`bg-dark-purple dark:bg-dark-mode-light-purple
                  border-4 border-light-purple dark:border-dark-mode-purple
                  h-16 w-16 absolute -top-5 left-[-1.2rem] rounded-full ${Menus[active].dis}
                `}
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
                      "mt-[-1.5rem] text-gold dark:text-dark-purple"
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
                    className={`text-gold dark:text-dark-purple font-primary font-extrabold items-center justify-center ${
                      active === i
                        ? "translate-y-4 duration-700 opacity-100"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {menu.name}
                  </span>
                </button>
                {/* {menu.name === t("header.search") && showSearchBar && (
                    <Search />
                )} */}
                {/* {menu.name === t("header.languages") && showLanguageSelect && (
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
                )} */}
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
