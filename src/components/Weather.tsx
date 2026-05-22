import { useContext, useState } from "react";
import { type HourlyWeatherData } from "../context/weather/WeatherDataContext.ts";
import { WeatherDetailContext } from "../context/weatherdetail/WeatherDetailContext.ts";
import { useNavigate } from "react-router";

export default function Weather({ hour, type }: {hour: HourlyWeatherData, type: string}) {

  const navigate = useNavigate();

  const [ celsius, setCelsius ] = useState<number>(0);
  const [ convertTemp, setConvertTemp ] = useState<boolean>(false);

  const weatherDetailContext = useContext(WeatherDetailContext);
  if (!weatherDetailContext) {
    throw new Error("WeatherDetailContext must be used inside WeatherDetailContextProvider");
  }
  const { setHover, setWindSpeed, setVisibility, setHumidity } = weatherDetailContext;

  function handleTemperateChange() {
    if (!convertTemp){
      const celsi = (hour.temp - 32) * 5/9;
      setCelsius(celsi);
    }
    setConvertTemp(!convertTemp);
  }

  function handleDateTime(): string {
    const time = new Date(`1970-01-01T${hour.datetime}`);
    return time.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit"})
  }

  const handleMouseOver = (windspeed: number, visibility: number, humidity: number) => {
    setHover(true);
    setWindSpeed(windspeed);
    setVisibility(visibility);
    setHumidity(humidity);
  }
  
  const handleMouseOut = () => {
    setHover(false);
    setWindSpeed(0);
    setVisibility(0);
    setHumidity(0);
  }

  return (
    <>
      {type==="hourly"?
        <div className="hourly-weather-container" key={hour.datetime}  onMouseOver={()=>handleMouseOver(hour.windspeed, hour.visibility, hour.humidity)} onMouseOut={handleMouseOut}>
          <div className="flex flex-col items-center mb-4">
            <p><b>{handleDateTime()}</b></p>
            <img src={`/icons/${hour.icon}.png`} alt={hour.icon} className="w-8 h-8"/>
            <p>{hour.conditions}</p>
          </div>
          <div className="flex gap-2" title="Temperature">
            <img src="/icons/temperature.png" alt="temperature icon" className="w-6 h-6"/>
            <p onClick={handleTemperateChange}>{convertTemp?celsius.toFixed(2)+"°C":hour.temp.toFixed(2)+"°F"}</p>
          </div>
          <div className="flex gap-2" title="Chances of Rain">
            <img src="/icons/rain.png" alt="rain icon" className="w-6 h-6"/>
            <p>{hour.precipprob}%</p>
          </div>
        </div>
      :
        <div className="weekly-weather-container" key={hour.datetime}  onMouseOver={()=>handleMouseOver(hour.windspeed, hour.visibility, hour.humidity)} onMouseOut={handleMouseOut} onClick={()=>navigate("/weeklyweather", {state: {icon: hour.icon, conditions: hour.conditions, temperature: hour.temp, windspeed:hour.windspeed, visibility: hour.visibility, humidity: hour.humidity, precipprob: hour.precipprob, datetime: hour.datetime}})}>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-center gap-2">
              <p><b>{hour.datetime}</b></p>
              <img src={`/icons/${hour.icon}.png`} alt={hour.icon} className="w-8 h-8"/>
              <p>{hour.conditions}</p>
            </div>
            <div className="flex flex-col items-center gap-2" title="Temperature">
              <img src="/icons/temperature.png" alt="temperature icon" className="w-6 h-6"/>
              <p onClick={handleTemperateChange}>{convertTemp?celsius.toFixed(2)+"°C":hour.temp.toFixed(2)+"°F"}</p>
            </div>
            <div className="flex flex-col items-center gap-2" title="Chances of Rain">
              <img src="/icons/rain.png" alt="rain icon" className="w-6 h-6"/>
              <p>{hour.precipprob}%</p>
            </div>
          </div>
        </div>
      }    
    </>
  )
}
