import cart from "../assets/cart.svg";
import profile from "../assets/profile.svg";
import admin from "../assets/admin.svg";
import lotus from "../assets/lotus.svg";
import hamburger from '../assets/hamburger.svg'
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <header className="bg-light-purple bg-opacity-20 h-auto p-4 mb-4">
      <div className="container mx-auto flex items-center justify-around px-4 py-4">
        <Link to={`/`} className="flex items-center">
          <img
            src={lotus}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
            alt="logo of a lotus that redirect to the landing/home page"
          />
          <h1 className="text-gold text-center font-primary font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ml-2 sm:ml-4">
            G.A.M.A.Z.A .Co
          </h1>
        </Link>

        <div className="flex items-center">
          <button
            className="hidden mb:block space-y-4 space-x-4 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img 
              src={hamburger}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              alt="logo of the hamburger that open our navbar"
            />
          </button>
          <nav
            className={`border border-b-2 border-gold rounded-lg shadow-lg transform ${
              menuOpen ? "block" : "hidden"
            } transition duration-300 ease-in-out md:flex md:items-center md:space-x-8`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mt-4 md:mt-0 md:ml-auto">
              <div className="relative group">
                <Switch />
                <Lang />
                <Link to={`/profile`} className="flex items-center mt-4 md:mt-0 hover:text-light-purple transition duration-300">
                  <img
                    src={profile}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
                    alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
                  />
                  <span className="hidden md:block text-xl sm:text-2xl text-gold font-primary font-extrabold ml-2">
                    {t("header.profile")}
                  </span>
                </Link>
                {isAdmin && (
                  <Link to={`/admin`} className="flex items-center mt-4 md:mt-0 hover:text-light-purple transition duration-300">
                    <img
                      src={admin}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
                      alt="logo of an admin that redirect to your dashboard and the edition or suppression of some products"
                    />
                    <span className="hidden md:block text-xl sm:text-2xl text-gold font-primary font-extrabold ml-2">
                      {t("header.admin")}
                    </span>
                  </Link>
                )}
                <div
                  className="relative group mt-4 md:mt-0"
                  onMouseEnter={() => setShowCartPopup(true)}
                  onMouseLeave={() => setShowCartPopup(false)}
                >
                  <Link to={`/cart`} className="flex items-center mt-4 md:mt-0">
                    <img
                      src={cart}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                      alt="logo of a cart that redirect to your cart and the finalization of your order"
                    />
                    <span className="hidden md:block text-2xl text-gold font-primary font-extrabold ml-2">
                      {t("header.cart")}
                    </span>
                  </Link>
                  <CartPopup show={showCartPopup} cartItems={cartItems} />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}