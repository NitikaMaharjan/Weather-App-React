import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext.ts";

export function ThemeProvider({ children }: { children: ReactNode }) {

    const [theme, setTheme] = useState<string | Theme>(localStorage.getItem("theme") || "light");

    function handleThemeChange(theme: string | Theme) {
        setTheme(theme);
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
}