import cart from "../assets/cart.svg";
import profile from "../assets/profile.svg";
import admin from "../assets/admin.svg";
import lotus from "../assets/lotus.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import localhost from "../config";
import Lang from "./utils/SwitchLangue";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const email = localStorage.getItem('user');
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
    <header className="flex items-center justify-between bg-light-purple bg-opacity-20 h-24 mt-10">
      <Link to={`/`}>
        <img
          src={lotus}
          className="ml-24"
          alt="logo of a lotus that redirect to the landing/home page"
        />
      </Link>
      <Lang />
      <h1 className="text-gold font-primary font-normal text-6xl">
        G.A.M.A.Z.A .Co
      </h1>
      <div className="flex mr-24">
        {isAdmin ? (
          <>
            <Link to={`/profile`}>
              <img
                src={profile}
                className="mr-8"
                alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
              />
            </Link>
            <Link to={`/admin`}>
              <img
                src={admin}
                className="mr-8"
                alt="logo of an admin that redirect to your dashboard and the edition or suppression of some products"
              />
            </Link>
          </>
        ) : (
          <Link to={`/profile`}>
            <img
              src={profile}
              className="mr-8"
              alt="logo of a person that redirect to your profile and the edition or suppression of your profile"
            />
          </Link>
        )}

        <Link to={`/cart`}>
          <img
            src={cart}
            className="gold"
            alt="logo of a cart that redirect to your cart and the finalization of your order"
          />
        </Link>
      </div>
    </header>
  );
}
