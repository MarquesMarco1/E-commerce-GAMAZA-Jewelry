import React, { useState} from 'react';
import DarkMode from './DarkMode';
import { DarkModeSwitch} from 'react-toggle-dark-mode';
import { useTranslation } from "react-i18next";

export default function Switch() {
    const [colorTheme, setTheme] = DarkMode();
    const [darkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false);
    const { t } = useTranslation();


    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkMode(checked);
    };

    return(
        <>
            <div className="flex items-center mt-4 md:mt-0">
                <DarkModeSwitch checked={darkMode} 
                    onChange={toggleDarkMode} 
                    color="#BF9553"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-110 transition duration-300"
                />
            <span className="hidden md:block text-xl sm:text-2xl text-gold font-primary font-extrabold ml-2">
                {t("header.darkmode")}
              </span>
            </div>
        </>
    );
}