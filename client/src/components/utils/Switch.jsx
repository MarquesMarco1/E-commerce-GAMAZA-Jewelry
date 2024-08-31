import React, { useState } from "react";
import DarkMode from "./DarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTranslation } from "react-i18next";

export default function Switch() {
  const [colorTheme, setTheme] = DarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  const { t } = useTranslation();

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div className="flex justify-end items-center hydrated">
        <div className="space-y-4 flex py-2 px-4 dark:hover:bg-dark-purple hover:bg-dark-mode-purple hover:bg-opacity-50 rounded"
        onClick={toggleDarkMode}>
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          color="#BF9553"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
        />
        <span className="text-sm text-gold font-primary font-extrabold ml-2 hover:text-light-purple transition duration-300">
          {darkMode ? t("header.darkmode") : t("header.lightmode")}
        </span>
      </div>
      </div>
    </>
  );
}
