import './App.css'
import { AuthProvider } from './context/Authentication'
import AppRoutes from './routes/routes'

function App() {


  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}

export default App
