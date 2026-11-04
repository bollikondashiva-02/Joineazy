
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login({ onSwitchToSignup }) {
  const { login } = useContext(AuthContext)

  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const success = login(email, password, role)

    if (!success) {
      setError('Invalid email, password or role. Please sign up first.')
    } else {
      setError('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 p-4 sm:p-6">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 sm:p-9 text-center text-white">

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl font-extrabold shadow-lg">
            J
          </div>

          <h1 className="text-3xl font-extrabold tracking-wide">
            Joineazy
          </h1>

          <p className="text-blue-100 text-sm mt-2">
            Assignment & Review Dashboard
          </p>

        </div>

        <div className="p-6 sm:p-9">

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Welcome Back!
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-7">
            Login to continue to your workspace.
          </p>

          <form onSubmit={handleLogin}>

            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
              Select Your Role
            </label>

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
                setError('')
              }}
              className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3.5 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>

            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Enter your email address"
              className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3.5 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter your password"
              className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3.5 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold p-3.5 rounded-xl shadow-lg transition-all"
            >
              Sign In →
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>

          <div className="mt-7 p-4 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">

            <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wide">
              Admin Demo Accounts
            </p>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
              admin1@joineazy.com
            </p>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              admin2@joineazy.com
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Password for both: Admin@123
            </p>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
