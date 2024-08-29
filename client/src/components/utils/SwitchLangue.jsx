import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import { Language } from "../../enum/Language";

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
    <div>
      <div>
        {language == "FR" && (
          <select
            value={language}
            name="language"
            onChange={handleChangeLanguage}
          >
            <option value={Language.FR}>FR</option>
            <option value={Language.EN}>EN</option>
          </select>
        )}
        {language == "EN" && (
          <select
            value={language}
            name="language"
            onChange={handleChangeLanguage}
          >
            <option value={Language.EN}>EN</option>
            <option value={Language.FR}>FR</option>
          </select>
        )}
        <span className="text-sm text-gold font-primary font-extrabold ml-2 hover:text-light-purple transition duration-300">
          {t("header.languages")}
        </span>
      </div>
    </div>
  );
};

export default Lang;
