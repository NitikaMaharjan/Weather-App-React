import './App.css'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { AlertProvider } from './context/alert/AlertProvider'
import { WeatherDataProvider } from './context/weather/WeatherDataProvider'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import WeeklyWeather from './components/WeeklyWeather'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AlertProvider>
          <WeatherDataProvider>
            <Routes>
              <Route path="/" element={ <Home />}/>
              <Route path="/weeklyweather" element={ <WeeklyWeather />}/>
            </Routes>
          </WeatherDataProvider>
        </AlertProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
