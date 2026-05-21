import { useLocation, useNavigate } from "react-router";
import WeeklyWeatherData from "./WeeklyWeatherData";

export default function WeeklyWeather() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    datetime,
    icon,
    conditions,
    temperature,
    windspeed,
    visibility,
    humidity,
    precipprob,
  } = location.state || {};

  return (
    <div className="flex flex-col gap-10">
      <button className="back-btn w-fit" onClick={() => navigate("/")}>Back</button>
      <div className="weekly-weather-card">
        <div className="flex flex-col items-center mb-4">
          <p>{datetime}</p>
          <img src={`/icons/${icon}.png`} alt={icon} className="w-22 h-22"/>
          <p>{conditions}</p>
        </div>
        <WeeklyWeatherData src={"/icons/temperature.png"} alt={"temperature icon"} title={"Temperature"} value={temperature?.toFixed(2)} unit={"°F"}/>
        <WeeklyWeatherData src={"/icons/wind.png"} alt={"wind icon"} title={"Wind Speed"} value={windspeed} unit={"km/h"}/>
        <WeeklyWeatherData src={"/icons/visibility.png"} alt={"visibility icon"} title={"Visibility"} value={visibility} unit={"km"}/>
        <WeeklyWeatherData src={"/icons/humidity.png"} alt={"humidity icon"} title={"Humidity"} value={humidity} unit={"%"}/>
        <WeeklyWeatherData src={"/icons/rain.png"} alt={"rain icon"} title={"Chances of Rain"} value={precipprob} unit={"%"}/>
      </div>
    </div>
  );
}
