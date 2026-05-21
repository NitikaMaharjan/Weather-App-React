import { createContext } from "react";

export interface HourlyWeatherData {
    datetime: string;
    icon: string;
    conditions: string;
    temp: number;
    windspeed: number;
    visibility: number;
    humidity: number;
    precipprob: number;
}

export interface DayWeatherData {
    datetime: string;
    icon: string;
    conditions: string;
    temp: number;
    windspeed: number;
    visibility: number;
    humidity: number;
    precipprob: number;
    hours: HourlyWeatherData[];
}

export interface WeatherData {
    timezone: string;
    currentConditions: {
        icon: string;
        conditions: string;
        temp: number;
        windspeed: number;
        visibility: number;
        humidity: number;
        precipprob: number;
    };
    days: DayWeatherData[];
}

export interface WeatherDataType {
    loading: boolean;
    weatherData: WeatherData | null;
    handleFetchWeatherData: (location: string) => void;
}

export const WeatherDataContext = createContext<WeatherDataType | undefined>(undefined);