import { useEffect, useRef, useState, type ReactNode } from "react";
import { WeatherDetailContext } from "./WeatherDetailContext";

export function WeatherDetailProvider({ children }: { children: ReactNode }) {

    const [hover, setHover] = useState<boolean>(false);
    const [windSpeed, setWindSpeed] = useState<number>(0);
    const [visibility, setVisibility] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);

    const cursorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleCursor = (event: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${event.clientX}px`;
                cursorRef.current.style.top = `${event.clientY}px`;
            }
        };

        window.addEventListener("mousemove", handleCursor);

        return () => {
            window.removeEventListener("mousemove", handleCursor);
        };
    }, []);

    return (
        <>
            <WeatherDetailContext.Provider value={{ setHover, setWindSpeed, setVisibility, setHumidity }}>
                {children}
            </WeatherDetailContext.Provider>

            <div ref={cursorRef} className="cursor">
                {
                    hover &&
                    <div className="absolute weather-details">
                        <div className="flex gap-2">
                            <img src="/icons/wind.png" alt="wind icon" className="icon"/>                            
                            <p>{windSpeed} km/h</p>
                        </div>
                        <div className="flex gap-2">
                            <img src="/icons/visibility.png" alt="visibility icon" className="icon"/>
                            <p>{visibility} km</p>
                        </div>
                        <div className="flex gap-2">
                            <img src="/icons/humidity.png" alt="humidity icon" className="icon"/>
                            <p>{humidity} %</p>
                        </div>                        
                    </div>
                }
            </div>
        </>
    );
}