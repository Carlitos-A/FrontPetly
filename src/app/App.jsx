import { AuthProvider } from "../features/auth/components/AuthContext"
import AppRouter from "./Router"

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
