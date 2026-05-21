import { useEffect, useRef, useState, type ReactNode } from "react";
import { WeatherDetailContext } from "./WeatherDetailContext.ts";
import WeatherDetails from "../../components/WeatherDetails";

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
                        <WeatherDetails src={"/icons/wind.png"} alt={"wind icon"} value={windSpeed} unit={"km/h"}/>
                        <WeatherDetails src={"/icons/visibility.png"} alt={"visibility icon"} value={visibility} unit={"km"}/>
                        <WeatherDetails src={"/icons/humidity.png"} alt={"humidity icon"} value={humidity} unit={"%"}/>
                    </div>
                }
            </div>
        </>
    );
}