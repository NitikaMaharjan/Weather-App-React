import { useContext, useState } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import { WeatherDataContext } from "../context/weather/WeatherDataContext";

export default function Navbar() {
    const [ location, setLocation ] = useState<string>("");

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext must be used inside ThemeProvider");
    }
    const { theme, handleThemeChange } = themeContext;
    
    const weatherDataContext = useContext(WeatherDataContext);
    if (!weatherDataContext) {
        throw new Error("weatherDataContext must be used inside weatherDataProvider");
    }
    const { handleFetchWeatherData } = weatherDataContext;

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLocation(event.target.value);        
    }

    function handleClearInput() {
        setLocation("");
    }

    return (
        <div className="navbar">
            <h1><b>SkyView Weather</b></h1>
            <div className="flex gap-3">
                <div className="input-bar">
                    <img src={`${theme==="light"?"/icons/search.png":"/icons/searchlight.png"}`} alt="search icon" className="w-5 h-5"/>
                    <input type="text" placeholder="Enter location" value={location} onChange={handleInputChange} className="search-input"/>
                    <img src={`${theme==="light"?"/icons/close.png":"/icons/closelight.png"}`} alt="close icon" className={`w-4 h-4 cursor-pointer ${location==="" ? "opacity-0" : "opacity-100"}`} onClick={handleClearInput}/>
                </div>
                <button onClick={() => handleFetchWeatherData(location)} className="search-btn">Search</button>
            </div>
            <div className="theme-toggle">
                <button onClick={()=>handleThemeChange("light")} className={`${theme==="light"?"theme-btn-active":"theme-btn"}`}><img src={`${theme==="light"?"icons/sundark.png":"icons/sunlight.png"}`} alt="theme icon" className="w-6 h-6"/></button>
                <button onClick={()=>handleThemeChange("dark")} className={`${theme==="dark"?"theme-btn-active":"theme-btn"}`}><img src={`${theme==="light"?"icons/moondark.png":"icons/moonlight.png"}`} alt="theme icon" className="w-6 h-6"/></button>
            </div>
        </div>
    )
}
