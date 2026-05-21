import { useContext, useEffect, useState, type ReactNode } from "react";
import { WeatherDataContext, type WeatherData } from "./WeatherDataContext.ts";
import { AlertContext } from "../alert/AlertContext";

export function WeatherDataProvider({ children }: { children: ReactNode }) {

    const apiKey: number = import.meta.env.VITE_WEATHER_API_KEY;

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null);

    const alertContext = useContext(AlertContext);
    if (!alertContext) {
        throw new Error("AlertContext must be used inside AlertProvider");
    }
    const { handleShowAlert } = alertContext;

    async function handleFetchWeatherData(location: string) {
        if (location==="") {
            handleShowAlert("Warning","Enter a location to get its weather!");
            return;
        } else {
            setLoading(true);
            try{
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json`);
                if (!response.ok) {
                    setLoading(false); 
                    throw new Error("Error fetching weather data!");
                }
                
                const data: WeatherData = await response.json();

                setTimeout(() => {
                    setLoading(false);                    
                }, 500);
                setWeatherData(data);
            }catch(error){
                console.error(error);                   
                handleShowAlert("Warning","The entered location does not exists!");
            }
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude: number = position.coords.latitude;
              const longitude: number = position.coords.longitude;
              const location: string = `${latitude},${longitude}`;
              handleFetchWeatherData(location);
            },
            (error) => {
              console.error("Error getting geolocation: ", error);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }, []);

    return (
        <>
            <WeatherDataContext.Provider value={{ loading, weatherData, handleFetchWeatherData }}>
                {children}
            </WeatherDataContext.Provider>
        </>
    );
}