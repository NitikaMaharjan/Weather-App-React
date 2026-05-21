import Navbar from "./Navbar"
import { WeatherDetailProvider } from "../context/weatherdetail/WeatherDetailProvider"
import WeatherContent from "./WeatherContent"

export default function Home() {
  return (
    <>
      <Navbar />
      <WeatherDetailProvider>
        <WeatherContent />
      </WeatherDetailProvider>
    </>
  )
}
