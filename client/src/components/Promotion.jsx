import { useEffect, useState, useContext } from "react";
import localhost from "../config";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";
import { Link } from "react-router-dom";

export default function Promotion() {
  const [productsPromo, setProductsPromo] = useState([]);
  const { t } = useTranslation();

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/allProductsInPromo`);
      if (response.ok) {
        const data = await response.json();
        setProductsPromo(data.products);
      }
    };
    fetchData();
  }, [language]);

  return (
    <>
      <h1 className="text-black text-3xl md:text-5xl font-primary m-8 text-center">
        {t("promotion.translated-text")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {productsPromo.length > 0 &&
          productsPromo.map(
            (elem) =>
              elem.stockQty !== 0 && (
                <Link to={`/product/${elem.id}`}>
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
                    <p className="font-primary text-black text-lg">
                      {language === "FR"
                        ? elem.description
                        : elem.descriptionEn}
                    </p>
                    <p className="font-bold font-primary text-black">
                      <span className="line-through">${elem.price}</span>{" "}
                      <span>
                        $
                        {elem.price -
                          (elem.price * elem.promotion.pourcentage) / 100}
                      </span>
                    </p>
                    <button className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300">
                      {t("search.cart")}
                    </button>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  );
}
