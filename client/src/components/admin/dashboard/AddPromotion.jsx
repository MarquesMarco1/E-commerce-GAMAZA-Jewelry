import { useEffect, useState, useContext } from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import localhost from "../../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../LanguageContext";

export default function AddPromotion() {
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [pourcentage, setPourcentage] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("All Categories");
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.allArticle);
      }
      const response_search = await fetch(
        `${localhost}/api/search/${language}`
      );
      if (response.ok) {
        const data_search = await response_search.json();
        if (data_search.product && data_search.product.length > 0) {
          setProduct(data_search.product);
          setCategories(data_search.category);
        }
      }
    };
    fetchData();
  }, [language]);

  const handleSearch = (e) => {
    // Handle Logic //
    e.preventDefault();
    setIsSearching(true);
    let list = [];

    if (language === "FR") {
      if (categoryName === "All Categories" && productName === "") {
        product.map((elem) => {
          list.push(elem);
        });
      } else {
        if (categoryName === "All Categories") {
          let result = product.filter((elem) =>
            elem.name.toLowerCase().includes(productName.toLowerCase())
          );
          list.push(result);
        } else {
          let result = product.filter(
            (elem) =>
              elem.category.name === categoryName &&
              elem.name.toLowerCase().includes(productName.toLowerCase())
          );
          list.push(result);
        }
      }
      console.log(list[0]);
      setSearchResults(list[0]);
    } else {
      if (categoryName === "All Categories" && productName === "") {
        product.map((elem) => {
          list.push(elem);
        });
      } else {
        if (categoryName === "All Categories") {
          let result = product.filter((elem) =>
            elem.nameEn.toLowerCase().includes(productName.toLowerCase())
          );
          list.push(result);
        } else {
          let result = product.filter(
            (elem) =>
              elem.category.nameEn === categoryName &&
              elem.nameEn.toLowerCase().includes(productName.toLowerCase())
          );
          list.push(result);
        }
      }
      setSearchResults(list[0]);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!pourcentage || !productSelected) {
      setError(language === "FR" ? "Champs invalide" : "Form invalid");
      return;
    }
    const formData = {
      product: productSelected,
      pourcentage: pourcentage,
    };
    const response = await fetch(`${localhost}/api/addPromotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.ok) {
      navigate(`/admin`, { replace: true });
    }
  };
  return (
    <>
      <Header></Header>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5"
      >
        <div className="flex p-3 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("search.searchBar")}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full md:w-80 p-2 border border-gold rounded-md font-primary mr-4"
          />
          <button
            type="submit"
            className="p-3 md:px-4 bg-light-purple border border-black text-black rounded-md hover:bg-gold transition duration-300"
          >
            {t("search.button")}
          </button>
        </div>
        <select
          value={categoryName}
          className="w-full md:w-auto p-2 font-primary border border-gold rounded-md"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option
            value="All Categories"
            className="text-gold font-primary bg-light-purple bg-opacity-20 hover:bg-light-purple"
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
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handelSubmit}
      >
        <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
          {t("createPromotion.title")}
        </h1>
        {error && <p>{error}</p>}

        <label htmlFor="">{t("createPromotion.pourcentage")}</label>
        <select
          className="border	border-solid border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          onChange={(e) => setPourcentage(e.target.value)}
        >
          <option value="">{t("createPromotion.choose")}</option>
          <option value="20">{t("createPromotion.20")}</option>
          <option value="30">{t("createPromotion.30")}</option>
          <option value="40">{t("createPromotion.40")}</option>
        </select>

        <label htmlFor="">{t("createPromotion.product")}</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {isSearching
            ? searchResults.length > 0 &&
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
                  <button className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300">
                    {t("createPromotion.button")}
                  </button>
                </div>
              ))
            : products &&
              products.map((elem) => (
                <div
                  key={elem.id}
                  className="flex flex-col justify-between h-full bg-white border border-gold rounded-lg p-5 shadow-lg"
                >
                  <img
                    src={elem.images}
                    alt={elem.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="font-primary text-gold text-2xl mt-4">
                    {language === "FR" ? elem.name : elem.nameEn}
                  </h3>
                  <button
                    className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300"
                    onClick={() => setProductSelected(elem.id)}
                  >
                    {t("createPromotion.button")}
                  </button>
                </div>
              ))}
        </div>
      </form>
      {error && <p>{error}</p>}
      <Footer></Footer>
    </>
  );
}
