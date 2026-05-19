import { useState } from "react";

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

export default function Weather({ hour }: {hour: HourlyWeatherData}) {

  const [ celsius, setCelsius ] = useState<number>(0);
  const [ convertTemp, setConvertTemp ] = useState<boolean>(false);

  function handleTemperateChange() {
    if (!convertTemp){
      const celsi = (hour.temp - 32) * 5/9;
      setCelsius(celsi);
    }
    setConvertTemp(!convertTemp);
  }

  return (
    <div key={hour.datetime}>
      <p><b>Datetime: {hour.datetime}</b></p>
      <p>Icon: {hour.icon}</p>
      <p>Conditions: {hour.conditions}</p>
      <p onClick={handleTemperateChange}>Temperature: {convertTemp?celsius+"°C":hour.temp+"°F"}</p>
      <p>Wind Speed: {hour.windspeed} km/h</p>
      <p>Visibility: {hour.visibility} km</p>
      <p>Humidity: {hour.humidity}%</p>
      <p>Precipitation Probability: {hour.precipprob}%</p>
    </div>
  )
}
