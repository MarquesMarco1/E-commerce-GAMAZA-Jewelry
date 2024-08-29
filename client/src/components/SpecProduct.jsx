import { Link, useParams } from "react-router-dom";
import localhost from "../config"; // Import de la configuration localhost
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next"; // Import du hook pour la traduction
import { LanguageContext } from "../LanguageContext";

import Header from "./Header"; // Composant Header
import Footer from "./Footer"; // Composant Footer
import inStock from "../assets/inStock.svg"; // Image du 'in stock'
import lowStock from "../assets/lowInStock.svg"; // Image du 'low in stock'
import soldOut from "../assets/soldOut.svg"; //Image du 'soldout'
import StockAlert from "./utils/stockAlert"; // Alerte stock
import ModeleProduct from "./ModeleProduct";
import SizeGuide from "./SizeGuide"; // Guide des tailles
import ReviewForm from "./review/ReviewForm"; // Avis
import { lastDayOfDecade } from "date-fns";

const SpecProduct = () => {
  const { id } = useParams(); // Récupération de l'ID du produit à partir des paramètres de l'URL
  const { t } = useTranslation(); // Utilisation du hook de traduction
  const [product, setProduct] = useState(null); // État pour stocker les informations du produit
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [selectedImage, setSelectedImage] = useState(""); // État pour stocker l'image sélectionnée
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
  const [isZoomed, setIsZoomed] = useState(false); // État pour gérer le zoom de l'image
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture de l'alerte de stock
  const [productSelect, setproductSelect] = useState(null); // État pour stocker le produit sélectionné
  const [allModele, setAllModele] = useState([]); // État pour stocker tous les modèles du produit

  const { language } = useContext(LanguageContext); // Utilisation du contexte de langue

  // Fonction pour envoyer une nouvelle entrée de statistiques au backend
  const newEntry = async () => {
    try {
      await fetch(`${localhost}/api/stats/products/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to post new entry:", err);
    }
  };

  // Effet qui se déclenche à chaque fois que l'ID ou la langue change
  useEffect(() => {
    newEntry();
  }, [id, language]);

  // Fonction pour rechercher les modèles de produits similaires
  const searchModele = async (elem) => {
    const words = elem.nameEn.split(" ");
    const firstWorld = words[0];
    let lastWord = "";

    if (words[words.length - 1] === "") {
      lastWord = words[words.length - 2];
    } else {
      lastWord = words[words.length - 1];
    }

    const response = await fetch(
      `${localhost}/api/filterModele/${firstWorld}/${lastWord}`
    );

    if (response.ok) {
      const data = await response.json();

      setAllModele(data.products);
    }
  };

  // Effet qui se déclenche à chaque fois que l'ID ou la langue change, pour récupérer les données du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            const productData = data.products[0];
            setProduct(productData);
            searchModele(productData);
            setSelectedImage(
              productData.images ? productData.images[0] : productData.image
            );
          } else {
            setError(new Error("Product not found"));
          }
        } else {
          setError(new Error("Failed to fetch product"));
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchProduct();
  }, [id, language]);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  // Fonction pour basculer le zoom de l'image
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Affichage d'une erreur s'il y en a une
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Affichage d'un message de chargement si le produit n'est pas encore chargé
  if (!product) {
    return (
      <div className="text-center text-red-500 py-4">
        {t("specProduct.error")}
      </div>
    );
  }

  // Fonction pour gérer l'affichage de l'état du stock
  const manageStock = (stockQty) => {
    if (stockQty >= 10) {
      return ["In stock", inStock];
    } else if (stockQty > 0) {
      return ["Low in stock", lowStock];
    } else {
      return ["Sold out", soldOut];
    }
  };

  // Fonction pour gérer l'alerte de stock
  const handleStockAlert = (productName) => {
    setproductSelect(productName);
    setIsOpen(true);
  };

  // Fonction pour gérer la soumission de l'alerte de stock
  const handleSubmit = (email) => {
    alert(
      `You will be notified at ${email} when ${productSelect} is back in stock`
    );
    setIsOpen(false);
  };

  // Appel de la fonction manageStock avec la quantité de stock du produit
  const [stockText, stockColorCode] = manageStock(product.stockQty);

  return (
    <>
      <div className="bg-light-purple bg-opacity-20 dark:bg-dark-mode-purple">
        <Header />
        <nav className="bg-gray-200 py-2 px-6">
          <ul className="flex space-x-4 p-4 text-gold font-primary font-bold hover:text-light-purple transition duration-300 ease-in-out">
            <li>
              <Link to={`/`}>{t("specProduct.homepage")}</Link>
            </li>
            <li>/</li>
            {product.category && (
              <>
                <li>
                  <Link to={`/category/${product.category.id}`}>
                    {language === "FR"
                      ? product.category.name
                      : product.category.nameEn}
                  </Link>
                </li>
                <li>/</li>
              </>
            )}
            <li>{language === "FR" ? product.name : product.nameEn}</li>
          </ul>
        </nav>
        <h1 className="text-gold text-5xl mb-6 font-primary text-center mt-4">
          {language === "FR" ? product.name : product.nameEn}
        </h1>
        <main className="py-6 px-4 max-w-7xl mx-auto">
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div
                className="flex flex-col space-y-4 overflow-auto"
                style={{ maxHeight: "600px" }}
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`w-20 h-20 cursor-pointer border-2 ${
                        selectedImage === image
                          ? "border-gold"
                          : "border-gray-300"
                      }`}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center mb-4 w-full max-w-4xl h-[600px] bg-gray-100">
                {selectedImage && (
                  <img
                    className="object-contain w-full h-full cursor-pointer"
                    src={selectedImage}
                    alt={product.name}
                    onClick={openModal}
                  />
                )}
              </div>
            </div>
            <div className="w-1/3">
              <h2 className="text-gold text-2xl mb-6 font-primary">
                {language === "FR"
                  ? product.description
                  : product.descriptionEn}
              </h2>
              <p className="text-2xl mb-4">
                {product.promotion.id !== 1 ? (
                  <>
                    <span className=" dark:text-gold line-through">
                      ${product.price}
                    </span>{" "}
                    <span className=" dark:text-gold">
                      $
                      {product.price -
                        (product.price * product.promotion.pourcentage) / 100}
                    </span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
              <div className="mb-4  dark:text-gold"></div>
              <div className="mb-4  dark:text-gold">
                <label htmlFor="color" className="block text-lg font-primary">
                  {t("specProduct.material")}
                </label>
                {allModele.length > 0 && <ModeleProduct data={allModele} />}
              </div>

              <SizeGuide data={product} />
            </div>
          </div>
        </main>
        <ReviewForm id={id} />

        <Footer />
        <StockAlert
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-4 max-w-3xl max-h-full overflow-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <div className="flex justify-center">
                <img
                  className={`cursor-zoom-in ${
                    isZoomed ? "transform scale-150" : "transform scale-100"
                  }`}
                  src={selectedImage}
                  alt={product.name}
                  onClick={toggleZoom}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SpecProduct;
