import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

//////////////////
//  Components  //
//////////////////

import DarkMode from "./DarkMode";

////////////////////////////////////
//  LIGHT AND DARK SWITCH SYSTEM  //
////////////////////////////////////

export default function Switch() {
  const [colorTheme, setTheme] = DarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div>
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={42}
          color="#BF9553"
        />
      </div>
    </>
  );
}
