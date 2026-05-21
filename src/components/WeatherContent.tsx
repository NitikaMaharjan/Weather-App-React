import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme/ThemeContext.ts";
import { WeatherDataContext, type HourlyWeatherData } from "../context/weather/WeatherDataContext.ts";
import Loading from "./Loading";
import WeatherCube from "./WeatherCube";
import Weather from "./Weather";

export default function WeatherContent() {

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
    const { loading, weatherData } = weatherDataContext;    

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
                                    <img src={`${theme==="light"?"/icons/location.png":"/icons/locationlight.png"}`} alt="location icon" className="w-5 h-5"/>
                                    <p style={{fontSize: "14px"}}>{weatherData.timezone}</p>
                                </div>
                                <div className="flex flex-col items-center gap-8">
                                    <p style={{fontSize: "48px"}}><b>{greetings}</b></p>
                                    <div className="flex flex-col items-center gap-3">
                                        <img src={`/icons/${weatherData.currentConditions.icon}.png`} alt={weatherData.currentConditions.icon} className="w-16 h-16"/>
                                        <p style={{fontSize: "14px"}}>{weatherData.currentConditions.conditions}</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-right leading-loose">
                                    <p style={{fontSize: "14px"}}>{currentTime}</p>
                                    <p style={{fontSize: "14px"}}>{currentDay}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-6">
                                <WeatherCube icon={"temperature.png"} title={"Temperature"} value={weatherData.currentConditions.temp} unit={""}/>
                                <WeatherCube icon={"wind.png"} title={"Wind Speed"} value={weatherData.currentConditions.windspeed} unit={"km/h"}/>
                                <WeatherCube icon={"visibility.png"} title={"Visibility"} value={weatherData.currentConditions.visibility} unit={"km"}/>
                                <WeatherCube icon={"humidity.png"} title={"Humidity"} value={weatherData.currentConditions.humidity} unit={"%"}/>
                                <WeatherCube icon={"rain.png"} title={"Chances of Rain"} value={weatherData.currentConditions.precipprob} unit={"%"}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1><b>Hourly Weather</b></h1>
                            <div className="hourly-weather">
                                {/* Object.keys(weatherData.days[0].hours) returns hour: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]*/}
                                {/* now we iterate over array of strings */}
                                {
                                    Object.values(weatherData.days[0].hours).map((hour: HourlyWeatherData, index: number) => (
                                        <Weather key={index} hour={hour} type={"hourly"}/>
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
                                        <Weather key={index} hour={hour} type={"weekly"}/>
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
