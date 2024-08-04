import localhost from "../config";
import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";
import Autocomplete from "./Autocomplete";
import { useNavigate } from 'react-router-dom';


export default function Search() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("All Categories");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { language } = useContext(LanguageContext);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/search/${language}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data.product && data.product.length > 0) {
          setProduct(data.product);
          setCategories(data.category);
          const combinedSuggestions = [...data.product];
          setSuggestions(combinedSuggestions);
          // setProductName(data.product.name);
          // console.log(combinedSuggestions)
        } else {
          setError(new Error("Product not found"));
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchProduct();
  }, [language]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    sortResults();

    setTimeout(() => {
      setIsSearching(false);
      // if(searchResults.length === 1) {
        // navigate(`/product/${searchResults[0].id}`)
      // }
    }, 500);
  };


//   const sortResults = () => {
//     // Handle Logic //
//     let list = [];

//     if (language === "FR") {
//       // Recherche par toutes les catégories //
//         if (productName === '' && categoryName === 'Toutes les catégories') {
//             list = [...product];
//         // Recherche par nom de produits //
//           } else if (productName !== '' && categoryName === 'Toutes les catégories') {
//             list = product.filter((elem) => 
//               elem.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
//           );
//           // Recherche par nom et par catégorie //
//         } else if (productName !== '' && categoryName !== 'Toutes les catégories') {
//           list = product.filter((elem) => 
//             elem.category.name == categoryName &&
//           elem.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())  
//         );
//         // Recherche par catégorie //  
//       } else {
//         list = product.filter((elem) => 
//           elem.category.name == categoryName
//       );
//     }   
//     // ENGLISH //
//   } else {
//     if (productName === '' && categoryName === 'All Categories') {
//       list = [...product];
//       // Recherche par nom de produits //
//     } else if (productName !== '' && categoryName === 'All Categories') {
//       console.log('product name:', productName);
//       list = product.filter((elem) => 
//         elem.nameEn.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
//     );
//     // Recherche par nom et par catégorie //
//   } else if (productName !== '' && categoryName !== 'All Categories') {
//     list = product.filter((elem) => 
//             elem.category.nameEn == categoryName &&
//     elem.nameEn.toLocaleLowerCase().includes(productName.toLocaleLowerCase())  
//   );
//   // Recherche par catégorie //  
// } else {
//   list = product.filter((elem) => 
//               elem.category.nameEn == categoryName
// );
// }
// }
// setSearchResults(list);
// } 

const sortResults = () => {
  let list = [];

  if (language === "FR") {
    if (categoryName === "Toutes les catégories") {
      if (productName === "") {
        list = [...product];
      } else {
        list = product.filter((elem) =>
          elem.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
        );
      }
    } else {
      list = product.filter(
        (elem) =>
          elem.category.name === categoryName &&
          elem.name.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
      );
    }
  } else {
    if (categoryName === "All Categories") {
      if (productName === "") {
        list = [...product];
      } else {
        list = product.filter((elem) =>
          elem.nameEn.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
        );
      }
    } else {
      list = product.filter(
        (elem) =>
          elem.category.nameEn === categoryName &&
          elem.nameEn.toLocaleLowerCase().includes(productName.toLocaleLowerCase())
      );
    }
  }

  setSearchResults(list);
  console.log('product name:', productName);
  console.log("Filtered List:", list);
};
    
const stringSuggestions = suggestions.map(suggestion => 
    typeof suggestion === 'object' ?  suggestion : {name: suggestion.name, image: '', prix: ''}
);
  // co:nsole.log(`String Suggestions:`, stringSuggestions)
  // console.log(`Suggestions:`, suggestions)
  
  if (error)
    return (
  <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
    
    return (
      <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5"
      >
        <div className="flex p-3 w-full md:w-auto  bg-white dark:bg-dark-mode-purple">
            <Autocomplete
              suggestions={stringSuggestions}
              />
          <button
            type="submit"
            className="p-3 md:px-4 bg-light-purple border border-black text-black rounded-md hover:bg-gold transition duration-300 dark:bg-gold"
          >
            {t("search.button")}
          </button>
          {isSearching && (
            <div className="text-center flex font-primary py-4">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-dark-purple"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#CD92F2"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              {t("search.loading")}
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}
          {!product && !isSearching && (
            <div className="text-center py-4 font-primary text-black">
              {t("search.error")}
            </div>
          )}
        </div>
        <select
          value={categoryName}
          className="w-full md:w-auto p-2 font-primary border border-gold rounded-md  dark:bg-dark-mode-light-purple dark:text-gold"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option
            value={language === 'FR' ? 'Toutes les catégories': 'All categories'}
            className="text-gold font-primary bg-light-purple bg-opacity-20 hover:bg-light-purple dark:bg-gold dark:text-white dark:hover-bg-dark-mode-light-purple"
          >
            {t("search.select")}
          </option>

          {categories.length > 0 &&
            categories.map((elem) => (
              <option
                key={elem.id}
                value={language === "FR" ? elem.name : elem.nameEn}
                className="text-gold font-primary"
              >
                {language === "FR" ? elem.name : elem.nameEn}
              </option>
            ))}
        </select>
      </form>

      {/* Results  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {searchResults.length > 0 &&
          searchResults.map((result) => (
            <div
              key={result.id}
              className="flex flex-col justify-between h-full bg-white border border-gold rounded-lg p-5 shadow-lg"
            >
              <img
                src={result.images}
                alt={result.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="font-primary text-gold text-2xl mt-4">
                {language === "FR" ? result.name : result.nameEn}
              </h3>
              <p className="font-primary text-black text-lg">
                {language === "FR" ? result.description : result.descriptionEn}
              </p>
              <p className="font-bold font-primary text-black">
                ${result.price}
              </p>
              <button className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300">
                {t("search.cart")}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
