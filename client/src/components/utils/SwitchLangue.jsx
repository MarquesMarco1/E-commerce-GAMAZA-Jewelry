import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import { Language } from "../../enum/Language";

const Lang = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase());
  };

  return (
    <div>
      <div className="dark:bg-dark-mode-purple dark:text-gold">
{language == 'FR' && <select value={language} name="language" onChange={handleChangeLanguage}>
          <option value={Language.FR}>FR</option>
          <option value={Language.EN}>EN</option>
        </select>}
{language == 'EN' && <select value={language} name="language" onChange={handleChangeLanguage}>
          <option value={Language.EN}>EN</option>
          <option value={Language.FR}>FR</option>
        </select>}
      </div>
    </div>
  );
};

export default Lang;
