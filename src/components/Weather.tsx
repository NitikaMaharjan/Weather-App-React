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

export default function Weather({ hour, type }: {hour: HourlyWeatherData, type: string}) {

  const [ celsius, setCelsius ] = useState<number>(0);
  const [ convertTemp, setConvertTemp ] = useState<boolean>(false);

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

  return (
    <div key={hour.datetime}>
      <p><b>Datetime: {type==="hourly"?handleDateTime():hour.datetime}</b></p>
      <p>Icon: {hour.icon}</p>
      <p>Conditions: {hour.conditions}</p>
      <p onClick={handleTemperateChange}>Temperature: {convertTemp?celsius.toFixed(2)+"°C":hour.temp.toFixed(2)+"°F"}</p>
      <p>Wind Speed: {hour.windspeed} km/h</p>
      <p>Visibility: {hour.visibility} km</p>
      <p>Humidity: {hour.humidity}%</p>
      <p>Precipitation Probability: {hour.precipprob}%</p>
    </div>
  )
}
