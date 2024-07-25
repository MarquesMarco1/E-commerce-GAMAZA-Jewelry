import Header from "./Header";
import localhost from "../config";
import { useEffect, useState } from "react";

export default function Search() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('All Categories');
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/search`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.product && data.product.length > 0) {
            setProduct(data.product);
            setCategories(data.category)
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
    sortResults();
    console.log(searchResults)
  };

  const sortResults = () => {
    // Handle Logic //
    let list = [];
    
    if (categoryName == 'All Categories' && productName == '') {
      product.map((elem) => {
        list.push(elem)
      })
    } else {
      product.map((elem) => {
        let startWith = elem.name.toLocaleLowerCase().toString().includes(productName.toLocaleLowerCase().toString())
        if(startWith && elem.category.name == categoryName){
          list.push(elem)
        }
      })
    }
    setSearchResults(list);
  }
  
  // Gestion d'erreurs //
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full md:w-80 px-3 font-primary h-10 rounded-l border-2 border-gold focus:outline-none focus:border-gold"
          />

          <button type="submit"
            className="rounded-r p-3 px-2 md:px-3 py-0 md:py-1 bg-light-purple text-xl font-bold text-black rounded-lg hover:bg-gold font-primary">
            Search
          </button>

        </div>

        <select
          value={categoryName}
          className="w-full h-10 border-2 border-gold focus:outline-none focus:border-gold text-gold rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option className="text-gold font-primary">All Categories</option>

          {categories.length > 0 && categories.map((elem) => (
            <option key={elem.id} value={elem.name}>{elem.name}</option>
          ))}

        </select>
      </form>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id}>
              <h3 className="font-primary text-gold">{result.name}</h3>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  )
}

