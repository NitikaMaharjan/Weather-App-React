import './App.css'
import UserLocation from './components/UserLocation'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { AlertProvider } from './context/alert/AlertProvider'
import { WeatherDetailProvider } from './context/weatherdetail/WeatherDetailProvider'

function App() {

  return (
    <ThemeProvider>
      <AlertProvider>
        <WeatherDetailProvider>
          <UserLocation />
        </WeatherDetailProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
