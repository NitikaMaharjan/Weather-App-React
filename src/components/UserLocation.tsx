import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { AlertContext } from "../context/alert/AlertContext";
import Weather from "./Weather";

interface HourlyWeatherData {
    datetime: string;
    icon: string;
    conditions: string;
    temp: number;
    windspeed: number;
    visibility: number;
    humidity: number;
    precipprob: number;
}

interface DayWeatherData {
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

interface WeatherData {
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

export default function UserLocation() {

    const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null);
    const [ location, setLocation ] = useState<string>("");
    const [ celsius, setCelsius ] = useState<number>(0);
    const [ convertTemp, setConvertTemp ] = useState<boolean>(false);

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used inside ThemeProvider");
    }
    const { handleThemeChange } = themeContext;
    
    const alertContext = useContext(AlertContext);
    if (!alertContext) {
        throw new Error("AlertContext must be used inside AlertProvider");
    }
    const { handleShowAlert } = alertContext;

    async function fetchWeatherData(location: string) {
        if (location==="") {
            handleShowAlert("warning","Enter a location to get its weather!");
            return;
        } else {
            try{
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=4TUZ9ERUN2ZP6N54MDMAQSUGU&contentType=json`);
                if (!response.ok) {
                    throw new Error("Error fetching weather data!");
                }
                
                const data: WeatherData = await response.json();
                setWeatherData(data);
            }catch(error){
                console.log(error);
                handleShowAlert("warning","The entered location does not exists!");
            }
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLocation(event.target.value);        
    }

    function handleTemperateChange(x: number) {
        if (!convertTemp){
            const celsi = (x - 32) * 5/9;
            setCelsius(celsi);
        }
        setConvertTemp(!convertTemp);
    }  

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const location = `${latitude},${longitude}`;
                    fetchWeatherData(location);
                },
                (error) => {
                    console.log("Error getting geolocation: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    
    return (
        <>
            <div className="navbar">
                <h1>SkyView Weather</h1>
                <div>
                    <input type="text" placeholder="Enter location" value={location} onChange={handleInputChange}/>
                    <button onClick={() => fetchWeatherData(location)}>Search</button>
                </div>
                <button onClick={handleThemeChange}>change theme</button>
            </div>
            {
                weatherData!==null && 
                <div className="weather-data">
                    <div className="current-weather">
                        <p>Timezone: {weatherData.timezone}</p>
                        <p>Icon: {weatherData.currentConditions.icon}</p>
                        <p>Conditions: {weatherData.currentConditions.conditions}</p>
                        <p onClick={()=>handleTemperateChange(weatherData.currentConditions.temp)}>Temperature: {convertTemp?celsius+"°C":weatherData.currentConditions.temp+"°F"}</p>
                        <p>Wind Speed: {weatherData.currentConditions.windspeed} km/h</p>
                        <p>Visibility: {weatherData.currentConditions.visibility} km</p>
                        <p>Humidity: {weatherData.currentConditions.humidity}%</p>
                        <p>Precipitation Probability: {weatherData.currentConditions.precipprob}%</p>
                    </div>
                    <div className="hourly-weather">
                        {/* Object.keys(weatherData.days[0].hours) returns hour: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]*/}
                        {/* now we iterate over array of strings */}
                        {
                            Object.values(weatherData.days[0].hours).map((hour: HourlyWeatherData) => (
                                <Weather hour={hour}/>
                            ))
                        }
                    </div>
                    <div className="weekly-weather">
                        {
                            Object.values(weatherData.days).map((hour: HourlyWeatherData, index: number) => (
                                index !== 0 && (
                                    <Weather hour={hour}/>
                                )                                
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}
