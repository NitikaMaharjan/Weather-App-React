import { createContext } from "react";

export interface WeatherDetailContextType {
    setHover: (value: boolean) => void;
    setWindSpeed: (value: number) => void;
    setVisibility: (value: number) => void;
    setHumidity: (value: number) => void;
}

export const WeatherDetailContext = createContext<WeatherDetailContextType | undefined>(undefined);