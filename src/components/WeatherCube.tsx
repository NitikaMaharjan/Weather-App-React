import { useState } from "react";

export default function WeatherCube({ icon, title, value, unit }: { icon: string, title: string, value: number, unit: string }) {

    const [ celsius, setCelsius ] = useState<number>(0);
    const [ convertTemp, setConvertTemp ] = useState<boolean>(false);

    function handleTemperateChange(x: number) {
        if (!convertTemp){
            const celsi: number = (x - 32) * 5/9;
            setCelsius(celsi);
        }
        setConvertTemp(!convertTemp);
    }

    return (
        <>
            <div className="weather-cube">
                <div className="flex flex-col items-center gap-1">
                    <img src={`/icons/${icon}`} alt={`${title} icon`} className="w-12 h-12 mb-2"/>
                    <p><b>{title}</b></p>
                </div>
                {
                    title==="Temperature" ?                    
                        <p  style={{fontSize: "16px"}} onClick={()=>handleTemperateChange(value)} className="cursor-pointer">{convertTemp?celsius.toFixed(2)+" °C":value.toFixed(2)+" °F"}</p>
                    :
                        <p style={{fontSize: "16px"}} >{`${value} ${unit}`}</p>
                }
            </div> 
        </>     
    )
}
