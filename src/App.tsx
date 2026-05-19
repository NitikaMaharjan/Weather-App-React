import './App.css'
import UserLocation from './components/UserLocation'
import { ThemeProvider } from './context/theme/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
      <UserLocation />
    </ThemeProvider>
  )
}

export default App
