import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
    theme: string | Theme;
    handleThemeChange: (theme: string | Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);