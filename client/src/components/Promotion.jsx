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
      const response_promo = await fetch(`${localhost}/api/getPromotion`);
      if (response_promo.ok) {
        const data_promo = await response_promo.json();
        console.log(data_promo.products);
        setProductsPromo(data_promo.products);
      }
    };
    fetchData();
  }, [language]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {productsPromo.length > 0 &&
        productsPromo.map(
          (elem) =>
            elem.product.stockQty !== 0 && (
              <Link to={`/product/${elem.product.id}`}>
                <div
                  key={elem.product.id}
                  className="flex flex-col justify-between h-full bg-white border border-gold rounded-lg p-5 shadow-lg"
                >
                  <img
                    src={elem.product.images}
                    alt={elem.product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="font-primary text-gold text-2xl mt-4">
                    {language === "FR"
                      ? elem.product.name
                      : elem.product.nameEn}
                  </h3>
                  <p className="font-primary text-black text-lg">
                    {language === "FR"
                      ? elem.product.description
                      : elem.product.descriptionEn}
                  </p>
                  <p className="font-bold font-primary text-black">
                    <span className=" line-through">${elem.product.price}</span>{" "}
                    <span>
                      $
                      {elem.product.price -
                        (elem.product.price * elem.pourcentage) / 100}
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
  );
}
