import './App.css'
import { AuthProvider } from './context/Authentication'
import AppRoutes from './routes/Routes'

function App() {

  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}

export default App
