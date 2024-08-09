import cartIcon from '../assets/cart.svg'; // Icône du panier
import profile from "../assets/profile.svg"; // Icône de profil utilisateur
import admin from "../assets/admin.svg"; // Icône d'administration
import lotus from "../assets/lotus.svg"; // Logo de GAMAZA
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; 
import localhost from "../config"; // Config symfony
import Lang from "./utils/SwitchLangue"; // Composant pour changer la langue
import { useTranslation } from "react-i18next"; // Hook de traduction
import Switch from "./utils/Switch"; // Composant Switch (pour le thème)
import CartPopup from "./utils/CartPopup"; // Popup du panier
import { useCart } from "../CartContext"; // Contexte du panier
import NotificationBadge from './NotificationBadge'; // Badge de notification
import AuthPopup from './utils/AuthPopup'; // Popup d'authentification

export default function Header() {
  const navigate = useNavigate(); // Naviguer entre les pages
  const location = useLocation(); // Obtenir l'emplacement actuel
  const [isAdmin, setIsAdmin] = useState(false); // Statut d'administrateur
  const [showCartPopup, setShowCartPopup] = useState(false); // Affichage du popup du panier
  const [showAuthPopup, setShowAuthPopup] = useState(false); // Affichage du popup d'authentification
  const { t } = useTranslation(); // Fonction de traduction
  const { state: cart } = useCart(); // Articles du panier
  const [cartItemCount, setCartItemCount] = useState(0); // Nombre total d'articles dans le panier

  const email = localStorage.getItem("user"); // Email de l'utilisateur
  const cartItems = cart; // Articles du panier

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        setIsAdmin(data.isAdmin); // Met à jour le statut d'administrateur
      }
    };
    fetchData();
  }, [email]); // Recharger si l'email change

  useEffect(() => {
    setCartItemCount(cartItems.reduce((acc, item) => acc + item.itemQty, 0)); // Met à jour le nombre d'articles dans le panier
  }, [cartItems]); // Recharger si les articles du panier changent

  const handleCartClick = () => {
    if (email) {
      navigate('/cart'); // Naviguer vers le panier si connecté
    } else if (location.pathname !== '/cart') {
      setShowAuthPopup(true); // Afficher le popup d'authentification si non connecté
    }
  };

  return (
    <>
      <header className="w-full flex flex-col sm:m-2 md:flex-row items-center justify-between bg-light-purple bg-opacity-20 h-auto md:h-24 p-4 md:p-6 md:px-24 mb-4 md:mb-0">
        <Link to={`/`}>
          <img
            src={lotus}
            className="w-24 h-24 md:w-32 md:h-32"
            alt="Logo du lotus redirigeant vers la page d'accueil"
          />
        </Link>
        <Switch /> {/* Composant pour le changement de thème */}
        <Lang /> {/* Composant pour changer la langue */}
        <h1 className="text-gold font-primary font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center flex-grow md:mx-4">
          G.A.M.A.Z.A .Co
        </h1>
        <div className="flex flex-col space-x-4 md:flex-row items-center md:mr-24 space-y-4 md:space-y-0 md:space-x-8">
          {isAdmin ? ( // Liens administrateur ou utilisateur
            <>
              <Link to={`/profile`} className="flex items-center">
                <img
                  src={profile}
                  className="mr-2 md:mr-8"
                  alt="Logo du profil utilisateur"
                />
                <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                  {t("header.profile")}
                </span>
              </Link>
              <Link to={`/admin`} className="flex items-center">
                <img
                  src={admin}
                  className="mr-2 md:mr-8"
                  alt="Logo de l'administration"
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
                alt="Logo du profil utilisateur"
              />
              <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                {t("header.profile")}
              </span>
            </Link>
          )}

          <div
            className="relative"
            onMouseEnter={() => setShowCartPopup(true)} // Affiche le popup du panier au survol
            onMouseLeave={() => setShowCartPopup(false)} // Masque le popup du panier
          >
            <div 
              className="flex items-center cursor-pointer" 
              onClick={handleCartClick} // Gère le clic sur l'icône du panier
            >
              <img
                src={cartIcon}
                className="mr-2 md:mr-8"
                alt="Logo du panier"
              />
              <span className="block md:hidden text-2xl text-gold font-primary font-extrabold">
                {t("header.cart")}
              </span>
              <NotificationBadge count={cartItemCount} /> {/* Badge de notification */}
            </div>
            {showCartPopup && ( // Affiche le popup du panier si nécessaire
              <CartPopup 
                show={showCartPopup} 
                cartItems={cartItems} 
                isLoggedIn={!!email} // Vérifie si l'utilisateur est connecté
              />
            )}
          </div>
        </div>
      </header>
      {showAuthPopup && !email && <AuthPopup onClose={() => setShowAuthPopup(false)} />} {/* Affiche le popup d'authentification si nécessaire */}
    </>
  );
}
