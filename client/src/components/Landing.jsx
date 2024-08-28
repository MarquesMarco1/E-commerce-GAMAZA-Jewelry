import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import localhost from "../config";
import { Link } from "react-router-dom";
import Carousel from "./utils/Carousel";
import Promotion from "./Promotion";
import { LanguageContext } from "../LanguageContext";
import Footer from "./Footer";
import Search from "./Search";
import Novelties from "./Novelties";

export default function Accueil() {
  const { language } = useContext(LanguageContext);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie/${language}`);
      if (response.status === 200) {
        const data = await response.json();
        setCategory(data.allCategory);
      }
    };

    fetchData();
  }, [language]);

  return (
    <div className="bg-light-purple bg-opacity-20 dark:bg-dark-mode-light-purple shadow-md">
      <Header />
      <div className="mt-8 flex flex-col items-center justify-center bg-white dark:bg-dark-mode-purple shadow-md hover:shadow-lg p-4 m-2 rounded-lg">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {category &&
            category.map((elem) => (
              <Link to={`/category/${elem.id}`} key={elem.id}>
                <li className="flex justify-center items-center font-primary text-gold text-md font-bold md:text-xl lg:text-2xl xl:text-3xl hover:text-dark-purple rounded-lg transition duration-300">
                  {language === "FR" ? elem.name : elem.nameEn}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <Search />
      <Carousel />
      <Promotion />
      <Novelties />
      <Footer />
    </div>
  );
}
