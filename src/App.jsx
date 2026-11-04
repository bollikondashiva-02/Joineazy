
import { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  const { user } = useContext(AuthContext)
  const [showSignup, setShowSignup] = useState(false)

  if (user) {
    return <Dashboard />
  }

  return showSignup ? (
    <Signup onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login onSwitchToSignup={() => setShowSignup(true)} />
  )
}

export default App
