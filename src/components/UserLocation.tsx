import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import HourlyWeather from "./HourlyWeather";
import WeeklyWeather from "./WeeklyWeather";
import Loading from "./Loading";
import { WeatherDataContext } from "../context/weather/WeatherDataContext";
import { type HourlyWeatherData } from "../context/weather/WeatherDataContext.ts";

export default function UserLocation() {

    const [ celsius, setCelsius ] = useState<number>(0);
    const [ convertTemp, setConvertTemp ] = useState<boolean>(false);
    const [ currentTime, setCurrentTime ] = useState<string>("");
    const [ currentDay, setCurrentDay ] = useState<string>("");
    const [ greetings, setGreetings ] = useState<string>("");   

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used inside ThemeProvider");
    }
    const { theme } = themeContext;
    
    const weatherDataContext = useContext(WeatherDataContext);
    if (!weatherDataContext) {
        throw new Error("weatherDataContext must be used inside weatherDataProvider");
    }
    const { loading, weatherData, handleFetchWeatherData } = weatherDataContext;    

    function handleTemperateChange(x: number) {
        if (!convertTemp){
            const celsi: number = (x - 32) * 5/9;
            setCelsius(celsi);
        }
        setConvertTemp(!convertTemp);
    }

    function handleUpdateDateTime() {
        const now: Date = new Date();

        setCurrentTime(
            now.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
            })
        );

        setCurrentDay(
            now.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
            })
        );
    }

    function handleGreetings() {
        const hour: number = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreetings("Good Morning!");
        } else if (hour >= 12 && hour < 17) {
            setGreetings("Good Afternoon!");
        } else if (hour >= 17 && hour < 21) {
            setGreetings("Good Evening!");
        } else {
            setGreetings("Good Night!");
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

    useEffect(() => {
        handleUpdateDateTime();
        handleGreetings();

        const interval = setInterval(() => {
            handleUpdateDateTime();
        }, 60000);

        return () => clearInterval(interval);
    }, []);    

    return (
        <>
            {   loading ?
                <div className="w-full flex-1 flex justify-center items-center">
                    <Loading/>
                </div>
                :    
                weatherData!==null && 
                <div className="weather-data">
                    <div className="left-div">
                        <div className="flex flex-col gap-14">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1 py-3 px-5 h-fit w-fit mt-3 location">
                                    <img src={`${theme==="light"?"/icons/location.png":"/icons/locationlight.png"}`} alt="location icon" className="w-4 h-4"/>
                                    <p style={{fontSize: "16px"}}>{weatherData.timezone}</p>
                                </div>
                                <div className="flex flex-col items-center gap-8">
                                    <p style={{fontSize: "48px"}}><b>{greetings}</b></p>
                                    <div className="flex flex-col items-center gap-3">
                                        <img src={`/icons/${weatherData.currentConditions.icon}.png`} alt={weatherData.currentConditions.icon} className="w-12 h-12"/>
                                        <p style={{fontSize: "16px"}}>{weatherData.currentConditions.conditions}</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-right leading-loose">
                                    <p style={{fontSize: "16px"}}>{currentTime}</p>
                                    <p style={{fontSize: "16px"}}>{currentDay}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-6">
                                <div className="weather-cube">
                                    <div className="flex flex-col items-center gap-1">
                                        <img src="/icons/temperature.png" alt="temperature icon" className="w-12 h-12"/>
                                        <p>Temperature</p>
                                    </div>
                                    <p  style={{fontSize: "16px"}} onClick={()=>handleTemperateChange(weatherData.currentConditions.temp)} className="cursor-pointer">{convertTemp?celsius.toFixed(2)+"°C":weatherData.currentConditions.temp.toFixed(2)+"°F"}</p>
                                </div>
                                <div className="weather-cube">
                                    <div className="flex flex-col items-center gap-1">
                                        <img src="/icons/wind.png" alt="wind icon" className="w-12 h-12"/>
                                        <p>Wind Speed</p>
                                    </div>
                                    <p style={{fontSize: "16px"}} >{weatherData.currentConditions.windspeed} km/h</p>
                                </div>
                                <div className="weather-cube">
                                    <div className="flex flex-col items-center gap-1">
                                        <img src="/icons/visibility.png" alt="visibility icon" className="w-12 h-12"/>
                                        <p>Visibility</p>                             
                                    </div>
                                    <p style={{fontSize: "16px"}} >{weatherData.currentConditions.visibility} km</p>
                                </div>
                                <div className="weather-cube">
                                    <div className="flex flex-col items-center gap-1">
                                        <img src="/icons/humidity.png" alt="humidity icon" className="w-12 h-12"/>
                                        <p>Humidity</p>
                                    </div>
                                    <p style={{fontSize: "16px"}} >{weatherData.currentConditions.humidity}%</p>
                                </div>
                                <div className="weather-cube">
                                    <div className="flex flex-col items-center gap-1">
                                        <img src="/icons/rain.png" alt="rain icon" className="w-12 h-12"/>
                                        <p>Chances of Rain</p>
                                    </div>
                                    <p style={{fontSize: "16px"}} >{weatherData.currentConditions.precipprob}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1><b>Hourly Weather</b></h1>
                            <div className="hourly-weather">
                                {/* Object.keys(weatherData.days[0].hours) returns hour: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]*/}
                                {/* now we iterate over array of strings */}
                                {
                                    Object.values(weatherData.days[0].hours).map((hour: HourlyWeatherData, index: number) => (
                                        <HourlyWeather key={index} hour={hour} type={"hourly"}/>
                                    ))
                                }
                            </div>
                        </div>           
                    </div>
                    <div className="right-div">
                        <h1><b>Weekly Weather</b></h1>
                        <div className="weekly-weather">
                            {
                                Object.values(weatherData.days).map((hour: HourlyWeatherData, index: number) => (
                                    index !== 0 && (
                                        <WeeklyWeather key={index} hour={hour} type={"weekly"}/>
                                    )                                
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
