import Header from "./Header";
import localhost from "../config";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Search() {
  // const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] =  useState([]);
  // const [searchTerm, setSearchTerm]= useState('');
    // const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState('');
    // const [data, setData] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`${localhost}/api/search`);

            if (!response.ok) {
              throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
            }

            if (response.ok) {
            const data = await response.json();

            if (data.product && data.product.length > 0) {
              setProduct(data.product[0]);
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
  }, []);
      
    const handleSearch = async (e) => {
        e.preventDefault();

        navigate(`search?=name=${product.name}&category=${product.category}`);
    };

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
        <form onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3">
          <div className="flex">
          <input
            type="text"
            placeholder="Search by terms or categories"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full md:w-80 px-3 font-primary h-10 rounded-l border-2 border-gold focus:outline-none focus:border-gold"
            />
          <button type="submit"
              className="rounded-r px-2 md:px-3 py-0 md:py-1 bg-light-purple text-3xl font-bold text-black rounded-lg hover:bg-gold font-primary">
              Search
          </button>
        </div>
          <select
            value={categories}
            class="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value=""
              className="text-gold font-primary">Toutes les catégories</option>
            {product.map(() => (
              <option key={product.id} value={product.category}>
                {product.category.name}
              </option>
            ))}
          </select>
        </form>
        </>
      );
  }