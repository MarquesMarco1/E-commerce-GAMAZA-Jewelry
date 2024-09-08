import { useEffect, useState } from "react";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import { useCart } from "../CartContext";
import { useNavigate, useParams } from "react-router-dom";
import Save4later from "../assets/save4later.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SizeGuide(data) {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState([]);
  const [sizeGuide, setSizeGuide] = useState([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("no size");
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const { state: cart, dispatch } = useCart([]);
  let navigate = useNavigate();
  const { id } = useParams();
  const [displayWishlist, setDisplayWishlist] = useState(false);

  const fetchIsLog = () => {
    const email = localStorage.getItem("user");
    if (email === null) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (fetchIsLog()) {
      setDisplayWishlist(true);
    }
    const fetchData = async () => {
      setCategory(data.data.category.name);
      setProduct(data.data);

      switch (data.data.category.name) {
        case "Colliers":
          const response_sizeNecklaces = await fetch(
            `${localhost}/api/sizeNecklaces`
          );
          if (response_sizeNecklaces.ok) {
            const data = await response_sizeNecklaces.json();
            setSizeGuide(data.sizeNecklaces);
          }
          break;

        case "Alliances":
        case "Bagues":
          const response_rings = await fetch(`${localhost}/api/sizeRings`);
          if (response_rings.ok) {
            const data = await response_rings.json();
            setSizeGuide(data.sizeRings);
          }
          break;

        case "Bracelets":
          const response_bracelets = await fetch(
            `${localhost}/api/sizeBracelets`
          );
          if (response_bracelets.ok) {
            const data = await response_bracelets.json();
            setSizeGuide(data.sizeBracelets);
          }
          break;

        default:
          setSizeGuide([]);
      }
    };
    fetchData();
  }, []);

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };

  const notify = () => {
    toast.success(
      localStorage.getItem("language") === "FR"
        ? "Ajouter au panier : ✓"
        : "Add to cart : Done ✓",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const handleAddToCart = async () => {
    const formData = {
      product: parseInt(id),
      quantity: parseInt(quantity),
      size: selectedSize,
      user: localStorage.getItem("user"),
    };

    if (fetchIsLog()) {
      const response = await fetch(`${localhost}/api/cartItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "ADD_ITEM", payload: data.success });
        notify();
        // navigate("/", { replace: true });
      }
    } else {
      const item = {
        itemQty: quantity,
        product: data.data,
        size: selectedSize,
      };
      dispatch({ type: "ADD_ITEM", payload: item });
      notify();
    }
  };

  const saveForLater = async () => {
    const formData = {
      product: parseInt(id),
      quantity: parseInt(quantity),
      size: selectedSize,
      user: localStorage.getItem("user"),
    };
    await fetch(`${localhost}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    toast.success(
      localStorage.getItem("language") === "FR"
        ? "Ajouter à ma liste de souhaits : ✓"
        : "Add to Wishlist : Done ✓",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  return (
    <>
      {sizeGuide.length > 0 && (
        <div className="mb-4">
          <label htmlFor="size" className="block text-lg font-primary">
            {t("sizeGuidePage.tailleChoose")}
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full dark:bg-dark-mode-light-purple dark:text-gold"
          >
            {sizeGuide.map((elem) => (
              <option value={elem.name}>{elem.name}</option>
            ))}
          </select>
          <button
            onClick={openSizeGuide}
            className="mt-2 text-sm text-blue-500 underline"
          >
            {t("sizeGuidePage.button")}
          </button>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-lg font-primary">
          {t("specProduct.quantity")}:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-gold text-white px-4 py-2 rounded-lg mb-4"
      >
        {t("specProduct.cart")}
      </button>
      <div className="mb-4">
        <p className="block text-lg font-primary">
          {t("specProduct.stockQty")} {product && product.stockQty}
        </p>
      </div>
      <div className="mb-4">
        <p className="block text-lg font-primary">
          {t("specProduct.weight")} {product && product.weight}g
        </p>
      </div>
      {displayWishlist && (
        <div className="mt-6 flex justify-center items-center">
          <button className="flex font-primary text-2xl" onClick={saveForLater}>
            <img className="mr-4" src={Save4later} alt="" />
            Save for later
          </button>
        </div>
      )}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-dark-mode-light-purple p-4 max-w-lg max-h-full overflow-auto">
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="text-center">
              {sizeGuide.length > 0 ? (
                sizeGuide[0].diameter ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideRings")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.circonférence")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">
                            {elem.circumference}
                          </li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.diamètre")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.diameter}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : category === "Colliers" ? (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideNecklaces")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {t("sizeGuidePage.guideBracelets")}
                    </h2>
                    <div className="flex">
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.taille")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <li className="border px-4 py-2">
                          {t("sizeGuidePage.longueur")}
                        </li>
                        {sizeGuide.map((elem) => (
                          <li className="border px-4 py-2">{elem.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
