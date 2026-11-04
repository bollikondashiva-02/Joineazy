
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const initialUsers = [
  {
    id: 1,
    name: 'Admin One',
    email: 'admin1@joineazy.com',
    password: 'Admin@123',
    role: 'admin',
    registered: true
  },
  {
    id: 2,
    name: 'Admin Two',
    email: 'admin2@joineazy.com',
    password: 'Admin@123',
    role: 'admin',
    registered: true
  },
  {
    id: 3,
    name: 'Shiva',
    email: 'shiva@joineazy.com',
    role: 'student',
    registered: false
  },
  {
    id: 4,
    name: 'Student Two',
    email: 'student2@joineazy.com',
    role: 'student',
    registered: false
  },
  {
    id: 5,
    name: 'Student Three',
    email: 'student3@joineazy.com',
    role: 'student',
    registered: false
  },
  {
    id: 6,
    name: 'Student Four',
    email: 'student4@joineazy.com',
    role: 'student',
    registered: false
  },
  {
    id: 7,
    name: 'Student Five',
    email: 'student5@joineazy.com',
    role: 'student',
    registered: false
  }
]

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('joineazyUsers')
    return savedUsers ? JSON.parse(savedUsers) : initialUsers
  })

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('joineazyUser')) || null
  )

  useEffect(() => {
    localStorage.setItem('joineazyUsers', JSON.stringify(users))
  }, [users])

  const signup = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    )

    if (existingUser && existingUser.registered) {
      return {
        success: false,
        message: 'This email is already registered.'
      }
    }

    if (existingUser && existingUser.role === 'admin') {
      return {
        success: false,
        message: 'This email cannot be used for student registration.'
      }
    }

    let newUser

    if (existingUser) {
      newUser = {
        ...existingUser,
        name: name.trim(),
        password,
        registered: true
      }

      setUsers((previous) =>
        previous.map((u) => u.id === existingUser.id ? newUser : u)
      )
    } else {
      newUser = {
        id: Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: 'student',
        registered: true
      }

      setUsers((previous) => [...previous, newUser])
    }
    return {
      success: true,
      message: 'Account created successfully!',
      user: newUser
    }
  }

  const login = (email, password, role) => {
    const normalizedEmail = email.trim().toLowerCase()

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail &&
        u.password === password &&
        u.role === role &&
        u.registered === true
    )

    if (!foundUser) return false

    setUser(foundUser)
    localStorage.setItem('joineazyUser', JSON.stringify(foundUser))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('joineazyUser')
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, users }}
    >
      {children}
    </AuthContext.Provider>
  )
}
