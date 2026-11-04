
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StudentDashboard from './StudentDashboard'
import AdminDashboard from './AdminDashboard'

function Dashboard() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">

      <Sidebar user={user} logout={logout} />

      <main className="flex-1 min-w-0">
        <Navbar user={user} />

        {user.role === 'student' ? (
          <StudentDashboard user={user} />
        ) : (
          <AdminDashboard user={user} />
        )}

      </main>

    </div>
  )
}

export default Dashboard
