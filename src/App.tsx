import './App.css'
import Navbar from './components/Navbar'
import UserLocation from './components/UserLocation'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { AlertProvider } from './context/alert/AlertProvider'
import { WeatherDataProvider } from './context/weather/WeatherDataProvider'
import { WeatherDetailProvider } from './context/weatherdetail/WeatherDetailProvider'

function App() {

  return (
    <ThemeProvider>
      <AlertProvider>
        <WeatherDataProvider>
          <Navbar />
          <WeatherDetailProvider>
            <UserLocation />
          </WeatherDetailProvider>
        </WeatherDataProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
