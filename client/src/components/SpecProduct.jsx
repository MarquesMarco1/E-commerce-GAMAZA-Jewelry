import { Link, useParams } from "react-router-dom";
import localhost from "../config";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const SpecProduct = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const newEntry = async () => {
    const language = localStorage.getItem("language");
    setLanguage(language);

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

  useEffect(() => {
    newEntry();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("SPECT ", data);
          if (data.products && data.products.length > 0) {
            setProduct(data.products[0]);
            setSelectedImage(data.products[0].image);
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
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // HANDLE BACK END CART LOGIC
      console.log(`Added ${quantity} of ${product.name} to cart`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-4">No product found</div>;
  }

  return (
    <>
      <Header />
      <nav className="bg-gray-200 py-2 px-6">
        <ul className="flex space-x-4">
          <li>
            <Link to={`/`}>Homepage</Link>
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
          <li className="font-semibold font-primary">
            {language === "FR" ? product.name : product.nameEn}
          </li>
        </ul>
      </nav>
      <main className="py-6 px-4 max-w-4xl mx-auto">
        <h1 className="text-gold text-5xl mb-9 text-center font-primary">
          {language === "FR" ? product.name : product.nameEn}
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            {selectedImage && (
              <img
                className="max-w-full max-h-80 cursor-pointer"
                src={selectedImage}
                alt={product.name}
                onClick={openModal}
              />
            )}
          </div>
          <div className="flex space-x-2">
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  className={`w-20 h-20 cursor-pointer border-2 ${
                    selectedImage === image ? "border-gold" : "border-gray-300"
                  }`}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </div>
        </div>
        <div className="mt-10 space-y-2">
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Category:{" "}
            {language === "FR"
              ? product.category.name
              : product.category.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Material:{" "}
            {language === "FR"
              ? product.material.name
              : product.material.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Stone:{" "}
            {language === "FR" ? product.stone.name : product.stone.nameEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Color: {language === "FR" ? product.color : product.colorEn}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Size: {product.sizes.name}
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Weight: {product.weight}g
          </p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">
            Stock Quantity: {product.stockQty}
          </p>
        </div>
        <div className="mt-10">
          <label htmlFor="quantity" className="block text-lg font-primary">
            Quantity:
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded-lg"
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-gold text-white px-4 py-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </main>
      <Footer />

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
    </>
  );
};

export default SpecProduct;
