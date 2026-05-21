import './App.css'
import Navbar from './components/Navbar'
import WeatherContent from './components/WeatherContent'
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
            <WeatherContent />
          </WeatherDetailProvider>
        </WeatherDataProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
