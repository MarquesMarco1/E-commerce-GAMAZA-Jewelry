import { useEffect, useState } from "react";

export default function DarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        // root.classList.remove(`hydrated-${colorTheme}`);
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
        // localStorage.setItem("colorTheme", colorTheme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}   