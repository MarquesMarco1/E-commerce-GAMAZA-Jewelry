import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";

export default function ModeleProduct(data) {
  const [modele, setModele] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setModele(data.data);
  }, [data, language]);

  return (
    <div className="flex flex-wrap">
      {modele &&
        modele.map((elem) => (
          <div className="flex flex-col ml-1">
            <p>
              {language === "FR" ? elem.material.name : elem.material.nameEn}
            </p>
            <Link to={`/product/${elem.id}`}>
              <img
                className={`w-20 h-20 cursor-pointer border-2`}
                src={elem.images}
                alt={elem.images}
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
