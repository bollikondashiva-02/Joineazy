
import { createContext, useEffect, useState } from 'react'

export const AssignmentContext = createContext()

const initialAssignments = [
  {
    id: 1,
    title: 'Java Programming Assignment',
    description: 'Complete basic Java programming problems.',
    dueDate: '2026-11-05',
    driveLink: 'https://drive.google.com/',
    createdBy: 1,
    assignedTo: [3, 4, 5, 6, 7],
    assignAllStudents: true,
    submissions: []
  },
  {
    id: 2,
    title: 'React Fundamentals',
    description: 'Build a simple React application using components.',
    dueDate: '2026-11-07',
    driveLink: 'https://drive.google.com/',
    createdBy: 1,
    assignedTo: [3, 4, 5, 6, 7],
    assignAllStudents: true,
    submissions: [3]
  },
  {
    id: 3,
    title: 'Database Assignment',
    description: 'Write SQL queries using MySQL.',
    dueDate: '2026-11-10',
    driveLink: 'https://drive.google.com/',
    createdBy: 2,
    assignedTo: [3, 4, 5, 6, 7],
    assignAllStudents: true,
    submissions: [3, 4, 5]
  }
]

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('joineazyAssignments')

    if (!saved) return initialAssignments

    const parsedAssignments = JSON.parse(saved)

    // Preserve older assignments and identify those previously assigned to everyone.
    return parsedAssignments.map((assignment) => ({
      ...assignment,
      submissions: assignment.submissions || [],
      assignAllStudents:
        assignment.assignAllStudents ??
        [3, 4, 5, 6, 7].every((id) =>
          (assignment.assignedTo || []).includes(id)
        )
    }))
  })

  useEffect(() => {
    localStorage.setItem(
      'joineazyAssignments',
      JSON.stringify(assignments)
    )
  }, [assignments])

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: Date.now(),
      submissions: []
    }

    setAssignments((previous) => [...previous, newAssignment])
  }

  const updateAssignment = (updatedAssignment) => {
    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.id === updatedAssignment.id
          ? updatedAssignment
          : assignment
      )
    )
  }

  const deleteAssignment = (id) => {
    setAssignments((previous) =>
      previous.filter((assignment) => assignment.id !== id)
    )
  }

  const addStudentToAllAssignments = (studentId) => {
    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.assignAllStudents
          ? {
              ...assignment,
              assignedTo: assignment.assignedTo.includes(studentId)
                ? assignment.assignedTo
                : [...assignment.assignedTo, studentId]
            }
          : assignment
      )
    )
  }

  const submitAssignment = (assignmentId, studentId) => {
    setAssignments((previous) =>
      previous.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              submissions: assignment.submissions.includes(studentId)
                ? assignment.submissions
                : [...assignment.submissions, studentId]
            }
          : assignment
      )
    )
  }

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignment,
        addStudentToAllAssignments
      }}
    >
      {children}
    </AssignmentContext.Provider>
  )
}
