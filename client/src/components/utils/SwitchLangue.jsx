import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import { Language } from "../../enum/Language";
import languages from "../../assets/languages.svg";

const Lang = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase());
  };

  return (
    <div className="flex items-center justify-end rounded-md">
      <div className="space-y-4 py-2 px-4 flex items-center dark:hover:bg-dark-purple hover:bg-dark-mode-light-purple hover:bg-opacity-50 rounded">
        {/* <img
          src={languages}
          className="w-8 h-8 md:w-12 md:h-12 hover:scale-110 transition duration-300"
          alt="logo of a cart that redirect to your cart and the finalization of your order"
        /> */}
        <select
          value={language}
          name="language"
          className="bg-white text-gold dark:bg-dark-mode-purple dark:text-gold p-1 md:p-2 rounded-md hover:text-dark-purple dark:hover:text-light-purple transition duration-300"
          onChange={handleChangeLanguage}
        >
          <option value={Language.FR}>FR</option>
          <option value={Language.EN}>EN</option>
        </select>
        <span className="text-sm text-gold font-primary font-extrabold ml-2 hover:text-dark-purple dark:hover:text-light-purple transition duration-300">
          {t("header.languages")}
        </span>
      </div>
    </div>
  );
};

export default Lang;
