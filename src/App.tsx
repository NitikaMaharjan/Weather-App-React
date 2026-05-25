import './App.css'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { AlertProvider } from './context/alert/AlertProvider'
import { WeatherDataProvider } from './context/weather/WeatherDataProvider'
import { RouterProvider } from 'react-router'
import router from './routes'

function App() {
  return (
    <>
      <ThemeProvider>
        <AlertProvider>
          <WeatherDataProvider>
            <RouterProvider router={router} />
          </WeatherDataProvider>
        </AlertProvider>
      </ThemeProvider>
    </>
  )
}

export default App
