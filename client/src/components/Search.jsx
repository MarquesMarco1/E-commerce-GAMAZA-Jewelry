import Header from "./Header";
import localhost from "../config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Search() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('All Categories');
  const [searchResults, setSearchResults] = useState([]);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

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
    
    if (categoryName === 'All Categories' && productName === '') {
      product.map((elem) => {
        list.push(elem)
      })
    } else {
      product.map((elem) => {
        const productNameLower = productName.toLocaleLowerCase();
        const elemNameLower = elem.name.toLocaleLowerCase();
        const elemCategoryName = elem.category.name;

        const startWith = elemNameLower.includes(productNameLower) || elemNameLower.includes(productNameLower.toString());
        if(startWith && (categoryName === 'All Categories') || elemCategoryName === categoryName) {
          list.push(elem);
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
  if (!product) return <div className="text-center py-4">{t('search.error')}</div>;


  return (
    <>
      <Header />
      <div className="p-5 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5">
          <div className="flex w-full md:w-auto">

            <input
              type="text"
              placeholder="Search by terms or categories"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full md:w-80 p-2 border border-gold rounded-md"
            />

            <button type="submit"
              className="p-2 md:px-4 bg-light-purple bg-opacity-20 text-black rounded-md hover:bg-gold">
              {t('search.button')}
            </button>
        </div>

        <select
          value={categoryName}
          className="w-full md:w-auto p-2 font-primary border border-gold rounded-md"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option value="All Categories" className="text-gold font-primary">{t('search.select')}</option>

          {categories.length > 0 && categories.map((elem) => (
            <option key={elem.id} value={elem.name}>{elem.name}</option>
          ))}

        </select>
      </form>

          <div className="flex flex-wrap gap-5">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result.id} className="bg-white border border-gold rounded-lg p-5 w-full md:w-1/3 shadow-lg">

              <img src={result.images} alt={result.name} className="w-full h-48 object-cover rounded-t-lg" />             
              <h3 className="font-primary text-gold text-2xl mt-4">{result.name}</h3>
                <p className="font-primary text-black text-lg">{result.description}</p>
                <p className="font-bold font-primary text-black">${result.price}</p>
                <button className="mt-4 w-full bg-gold text-white py-2 rounded-lg hover:bg-gold hover:bg-opacity-20">
                  {t('search.cart')}
                </button>
              </div>
            ))
          ) : (
            <p>{t('search.error')}</p>
          )}
        </div>
      </div>
    </>
  )
}

