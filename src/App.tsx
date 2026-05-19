import './App.css'
import UserLocation from './components/UserLocation'
import { ThemeProvider } from './context/theme/ThemeProvider'
import { AlertProvider } from './context/alert/AlertProvider'

function App() {

  return (
    <ThemeProvider>
      <AlertProvider>
        <UserLocation />
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
