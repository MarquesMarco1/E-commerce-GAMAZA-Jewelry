import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../../enum/Language";

const Lang = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = (event) => {
    const language = event.target.value;

    switch (language) {
      case Language.EN:
        localStorage.setItem("language", "EN");
        setLang(Language.EN);
        i18n.changeLanguage(Language.EN);
        break;
      case Language.FR:
      default:
        localStorage.setItem("language", "FR");
        setLang(Language.FR);
        i18n.changeLanguage(Language.FR);
        break;
    }
  };

  return (
    <div>
      <div>
        <select value={lang} name="language" onChange={changeLanguage}>
          <option value={Language.FR}>FR</option>
          <option value={Language.EN}>EN</option>
        </select>
      </div>
    </div>
  );
};

export default Lang;
