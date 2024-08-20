import { useEffect, useState, useContext } from "react";
import localhost from '../config';
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";
import { Link } from "react-router-dom";

export default function Novelties() {
    const [newProducts, setNewProducts] = useState([]);
    const { t } = useTranslation();

    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`${localhost}/api/allNovelties`);
          if (response.ok) {
            const data = await response.json();
            setNewProducts(data.products);
          }
        };
        fetchData();
      }, [language]);

      
  return (
    <>
      <h1 className="text-black dark:text-gold text-3xl md:text-5xl font-primary m-8 text-center">
        {t("novelties.new")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {newProducts.length > 0 &&
          newProducts.map(
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
                    </p>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  );
    
}