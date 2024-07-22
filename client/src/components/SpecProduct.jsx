import { Link } from "react-router-dom";
import localhost from "../config";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SpecProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();

          if (data.products && data.products.length > 0) {
            setProduct(data.products[0]);
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

  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  if (!product) return <div className="text-center py-4">No product found</div>;

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
                <Link to={`/category/${product.category.id}`}>{product.category.name}</Link>
              </li>
              <li>/</li>
            </>
          )}
          <li className="font-semibold font-primary">{product.name}</li>
        </ul>
      </nav>
      <main className="py-6 px-4 max-w-4xl mx-auto">
        <h1 className="text-gold text-5xl mb-9 text-center font-primary">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-gold rounded-lg">
          <div className="flex justify-center">
            {product.image && (
              <img
                className="max-w-full h-auto"
                src={product.image}
                alt={product.name}
              />
            )}
          </div>
          <div className="space-y-4">
            <p className="text-lg font-semibold font-primary">{product.description}</p>
            <p className="text-lg font-primary">
              Price: <span className="text-green-500 font-primary">${product.price}</span>
            </p>
            <p className="text-lg font-primary">Category: {product.category.name}</p>
            <p className="text-lg font-primary">Material: {product.material.name}</p>
            <p className="text-lg font-primary">Stone: {product.stone.name}</p>
            <p className="logo of a lotus that redirect to the landing/home page
G.A.M.A.Z.A .Co
logo of a person that redirect to your profile and the edition or suppression of your profile
logo of an admin that redirect to your dashboard and the edition or suppression of some products
logo of a cart that redirect to your cart and the finalization of your order

    Homepage
    /
    Necklaces
    /
    Serti Griffes Oxydes De Zirconium Mailletext-lg font-primary">Color: {product.color}</p>
            <p className="text-lg font-primary">Size: {product.size}</p>
            <p className="text-lg font-primary">Weight: {product.weight}g</p>
            <p className="text-lg font-primary">Stock Quantity: {product.stock_qty}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SpecProduct;
