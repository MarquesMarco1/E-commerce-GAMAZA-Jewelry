import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import { Language } from "../../enum/Language";
import languages from '../../assets/languages.svg'

const Lang = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase());
  };

  return (
    <div className="flex justiify-center items-center rounded-md">
      <div className="text-gold dark:bg-dark-mode-purple dark:text-gold">
        <img src={languages}
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12"
        alt="logo of a cart that redirect to your cart and the finalization of your order"
      />
        {language == 'FR' && (
          <select value={language} 
            name="language" 
            className="bg-white text-gold dark:bg-dark-mode-purple dark:text-gold p-2 rounded-md" 
            onChange={handleChangeLanguage}
            >
            <option value={Language.FR}>FR</option>
            <option value={Language.EN}>EN</option>
          </select>
        )}
        {language == 'EN' && (
          <select value={language} 
            name="language"
            className="bg-white text-gold dark:bg-dark-mode-purple dark:text-gold p-2 rounded-md"  
            onChange={handleChangeLanguage}
            >
            <option value={Language.EN}>EN</option>
            <option value={Language.FR}>FR</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default Lang;
