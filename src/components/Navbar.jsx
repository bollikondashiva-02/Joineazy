
import { useEffect, useState } from 'react'

function Navbar({ user }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('joineazyDarkMode') === 'true'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('joineazyDarkMode', String(newMode))
  }

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-wrap justify-between items-center gap-3">

        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
            {user.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {user.name}! 👋
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={toggleDarkMode}
            className="px-3 sm:px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar
