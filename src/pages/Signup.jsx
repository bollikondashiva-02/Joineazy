
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { AssignmentContext } from '../context/AssignmentContext'

function Signup({ onSwitchToLogin }) {
    const { signup } = useContext(AuthContext)
    const { addStudentToAllAssignments } = useContext(AssignmentContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSignup = (e) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        if (password.length < 6) {
            setError('Password must contain at least 6 characters.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        const result = signup(name, email, password)

        if (!result.success) {
            setError(result.message)
            return
        }

        addStudentToAllAssignments(result.user.id)

        setSuccess(result.message)
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 p-4 sm:p-6">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-extrabold">
                        J
                    </div>

                    <h1 className="text-3xl font-extrabold">Joineazy</h1>

                    <p className="text-blue-100 text-sm mt-2">
                        Create your student account
                    </p>
                </div>

                <div className="p-6 sm:p-8">

                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Create Account
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
                        Sign up to access your assignment workspace.
                    </p>

                    <form onSubmit={handleSignup}>

                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                        {success && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl p-3 text-sm mb-4">
                                {success}
                                <button
                                    type="button"
                                    onClick={onSwitchToLogin}
                                    className="block font-bold underline mt-2"
                                >
                                    Go to Login
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold p-3.5 rounded-xl shadow-lg transition-all"
                        >
                            Create Account →
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                        >
                            Login
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Signup
