
import { useContext, useState } from 'react'
import { AssignmentContext } from '../context/AssignmentContext'

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function StudentDashboard({ user }) {
  const { assignments, submitAssignment } = useContext(AssignmentContext)

  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')

  // Get assignments assigned to the logged-in student
  const myAssignments = assignments.filter((assignment) =>
    assignment.assignedTo.includes(user.id)
  )

  // Get the status of an assignment
  const getAssignmentStatus = (assignment) => {
    const isSubmitted = assignment.submissions.includes(user.id)

    if (isSubmitted) return 'submitted'

    if (assignment.dueDate < getTodayDate()) {
      return 'overdue'
    }

    return 'pending'
  }

  const submittedCount = myAssignments.filter((assignment) =>
    getAssignmentStatus(assignment) === 'submitted'
  ).length

  const overdueCount = myAssignments.filter((assignment) =>
    getAssignmentStatus(assignment) === 'overdue'
  ).length

  const pendingCount = myAssignments.filter((assignment) =>
    getAssignmentStatus(assignment) === 'pending'
  ).length

  const totalCount = myAssignments.length

  const progress = totalCount > 0
    ? (submittedCount / totalCount) * 100
    : 0

  // Search, filter and sort assignments
  const filteredAssignments = myAssignments
    .filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((assignment) => {
      const status = getAssignmentStatus(assignment)

      if (filterStatus === 'submitted') return status === 'submitted'
      if (filterStatus === 'pending') return status === 'pending'
      if (filterStatus === 'overdue') return status === 'overdue'

      return true
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return b.id - a.id
      if (sortOrder === 'oldest') return a.id - b.id

      if (sortOrder === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }

      return 0
    })

  return (
    <div className="p-4 md:p-8 transition-colors duration-300">

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
        My Assignments
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Track your assignments and submission progress.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Total Assignments
          </p>
          <h3 className="text-3xl font-bold mt-2">{totalCount}</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">Submitted</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {submittedCount}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">Pending</p>
          <h3 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingCount}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {overdueCount}
          </h3>
        </div>

      </div>

      {/* Overall Progress */}
      <div className="mt-8 bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm">

        <h3 className="font-bold text-lg mb-3">
          Overall Progress
        </h3>

        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {submittedCount} of {totalCount} assignments submitted
        </p>

      </div>

      {/* Assignment List */}
      <div className="mt-8">

        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-5">
          Assignment List
        </h3>

        {/* Search, Filter and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg p-3 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600"
          >
            <option value="all">All Assignments</option>
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-lg p-3 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueDate">Due Date</option>
          </select>

        </div>

        {myAssignments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 dark:text-gray-300 p-8 rounded-xl text-center text-gray-500">
            No assignments available yet.
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 dark:text-gray-300 p-8 rounded-xl text-center text-gray-500">
            No assignments match your search or filter.
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {filteredAssignments.map((assignment) => {
              const status = getAssignmentStatus(assignment)

              const statusStyles = {
                submitted: 'bg-green-100 text-green-700',
                pending: 'bg-orange-100 text-orange-700',
                overdue: 'bg-red-100 text-red-700',
              }

              const statusLabels = {
                submitted: 'Submitted',
                pending: 'Pending',
                overdue: 'Overdue',
              }

              return (
                <div
                  key={assignment.id}
                  className="bg-white dark:bg-slate-800 dark:text-white p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300"
                >

                  <div className="flex justify-between gap-3">
                    <h4 className="font-bold text-lg">
                      {assignment.title}
                    </h4>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full h-fit ${statusStyles[status]}`}
                    >
                      {statusLabels[status]}
                    </span>
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 mt-3">
                    {assignment.description}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Due date: {assignment.dueDate}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">

                    <a
                      href={assignment.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                    >
                      Open Drive Link
                    </a>

                    {status !== 'submitted' && (
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Yes, I have submitted
                      </button>
                    )}

                  </div>

                </div>
              )
            })}

          </div>
        )}

      </div>

      {/* Submission Confirmation Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white dark:bg-slate-800 dark:text-white rounded-xl p-6 max-w-md w-full shadow-xl">

            <h3 className="text-xl font-bold mb-3">
              Confirm Submission
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you have submitted "{selectedAssignment.title}"?
              Your status will change to Submitted.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 border dark:border-slate-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  submitAssignment(selectedAssignment.id, user.id)
                  setSelectedAssignment(null)
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Submission
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default StudentDashboard
