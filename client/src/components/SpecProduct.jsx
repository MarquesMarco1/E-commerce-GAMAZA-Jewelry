import { Link, useParams } from "react-router-dom";
import localhost from "../config";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const SpecProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

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

  useEffect(() => {
    newEntry();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            const productData = data.products[0];
            setProduct(productData);
            setSelectedImage(productData.images ? productData.images[0] : productData.image);
            if (Array.isArray(productData.sizes) && productData.sizes.length > 0) {
              setSelectedSize(productData.sizes[0]);
            }
            if (Array.isArray(productData.colors) && productData.colors.length > 0) {
              setSelectedColor(productData.colors[0]);
            }
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

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };

  const getSizeGuide = () => {
    switch (product.category.name.toLowerCase()) {
      case 'colliers':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour colliers (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Longueur (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Small</td>
                  <td className="border px-4 py-2">40 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Medium</td>
                  <td className="border px-4 py-2">45 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Large</td>
                  <td className="border px-4 py-2">50 cm</td>
                </tr>
                {/* Il faudra rajouter des tailles plus tard en s'inspirant des vrais guides */}
                </tbody>
            </table>
          </div>
        );
      case 'bagues':
      case 'alliances':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour bagues/alliances (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Circonférence (mm)</th>
                  <th className="border px-4 py-2">Diamètre (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">48</td>
                  <td className="border px-4 py-2">48 mm</td>
                  <td className="border px-4 py-2">15.3 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">50</td>
                  <td className="border px-4 py-2">50 mm</td>
                  <td className="border px-4 py-2">15.9 mm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">52</td>
                  <td className="border px-4 py-2">52 mm</td>
                  <td className="border px-4 py-2">16.5 mm</td>
                </tr>
                {/* Il faudra rajouter des tailles plus tard en s'inspirant des vrais guides */}
              </tbody>
            </table>
          </div>
        );
      case 'bracelets':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guide des tailles pour bracelets (EU)</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Taille (EU)</th>
                  <th className="border px-4 py-2">Longueur (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Small</td>
                  <td className="border px-4 py-2">17 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Medium</td>
                  <td className="border px-4 py-2">19 cm</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Large</td>
                  <td className="border px-4 py-2">21 cm</td>
                </tr>
                {/* Il faudra rajouter des tailles plus tard en s'inspirant des vrais guides */}
                </tbody>
            </table>
          </div>
        );
      default:
        return <p>Aucun guide des tailles disponible pour ce type de produit.</p>;
    }
  };

  const renderOptions = (items) => (
    Array.isArray(items) ? items.map(item => (
      <option key={item} value={item}>{item}</option>
    )) : null
  );

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
                  {product.category.name}
                </Link>
              </li>
              <li>/</li>
            </>
          )}
          <li className="font-semibold font-primary">{product.name}</li>
        </ul>
      </nav>
      <main className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col space-y-4 overflow-auto" style={{ maxHeight: '600px' }}>
              {product.images && product.images.map((image, index) => (
                <img
                  key={index}
                  className={`w-40 h-40 cursor-pointer border-2 ${selectedImage === image ? 'border-gold' : 'border-gray-300'}`}
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
            <h1 className="text-gold text-5xl mb-6 font-primary">{product.name}</h1>
            <p className="text-2xl mb-4">{product.price} €</p>
            <div className="mb-4">
              <label htmlFor="size" className="block text-lg font-primary">Sélectionner ma taille :</label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {renderOptions(product.sizes)}
              </select>
              <button
                onClick={openSizeGuide}
                className="mt-2 text-sm text-blue-500 underline"
              >
                Guide des tailles
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="color" className="block text-lg font-primary">Couleur :</label>
              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {renderOptions(product.colors)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-lg font-primary">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                {[...Array(10).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-gold text-white px-4 py-2 rounded-lg"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        <div className="mt-10 space-y-2">
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Category: {product.category.name}</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Material: {product.material.name}</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Stone: {product.stone.name}</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Color: {product.color}</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Size: {product.size}</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Weight: {product.weight}g</p>
          <div className="border-b-2 border-gray-300"></div>
          <p className="text-lg font-primary bg-purple-100 bg-opacity-30 p-2">Stock Quantity: {product.stockQty}</p>
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
                className={`cursor-zoom-in ${isZoomed ? 'transform scale-150' : 'transform scale-100'}`}
                src={selectedImage}
                alt={product.name}
                onClick={toggleZoom}
              />
            </div>
          </div>
        </div>
      )}

      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 max-w-lg max-h-full overflow-auto">
            <button
              onClick={closeSizeGuide}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-center">
              {getSizeGuide()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecProduct;
