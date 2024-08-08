import { useEffect, useState } from "react";

export default function DarkMode() {
  ////////////////
  //  UseState  //
  ////////////////

  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  ////////////////
  //  UseState  //
  ////////////////

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
