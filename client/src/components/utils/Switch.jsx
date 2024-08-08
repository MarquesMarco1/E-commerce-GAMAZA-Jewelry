import React, { useState} from 'react';
import DarkMode from './DarkMode';
import { DarkModeSwitch} from 'react-toggle-dark-mode';

export default function Switch() {
    const [colorTheme, setTheme] = DarkMode();
    const [darkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false);

    const toggleDarkMode = checked => {
        setTheme(colorTheme);
        setDarkMode(checked);
    };

    return(
        <>
            <div>
                <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={32} color="#BF9553"/>
            </div>
        </>
    );
}