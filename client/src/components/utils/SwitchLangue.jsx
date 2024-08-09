import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import { Language } from "../../enum/Language";
import languages from '../../assets/languages.svg'

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
    <div className="flex justify-center items-center rounded-md">
      <div className="items-center space-y-2 block py-2 px-4 hover:bg-light-purple hover:bg-opacity-50 rounded">
        <img
          src={languages}
          className="w-8 h-8 md:w-12 md:h-12 hover:scale-110 transition duration-300"
          alt="logo of a cart that redirect to your cart and the finalization of your order"
        />
        <span className="block md:hidden text-sm md:text-xl sm:text-2xl text-gold font-primary font-extrabold ml-2 hover:text-light-purple transition duration-300">
          {t("header.languages")}
        </span>
        <select
          value={language}
          name="language"
          className="bg-white text-gold dark:bg-dark-mode-purple dark:text-gold p-1 md:p-2 rounded-md"
          onChange={handleChangeLanguage}
        >
          <option value={Language.FR}>FR</option>
          <option value={Language.EN}>EN</option>
        </select>
      </div>
    </div>
  );
};

export default Lang;