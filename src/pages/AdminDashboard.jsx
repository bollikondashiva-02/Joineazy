
import { useContext, useState } from 'react'
import { AssignmentContext } from '../context/AssignmentContext'
import { AuthContext } from '../context/AuthContext'

// Get today's date in YYYY-MM-DD format using local time
const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function AdminDashboard() {
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment
  } = useContext(AssignmentContext)

  const { user, users } = useContext(AuthContext)

  const students = users.filter((u) => u.role === 'student')

  const myAssignments = assignments.filter(
    (assignment) => assignment.createdBy === user.id
  )

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [assignAll, setAssignAll] = useState(true)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    driveLink: '',
    assignedTo: students.map((student) => student.id)
  })

  // Search and sort
  const filteredAssignments = myAssignments
    .filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') return b.id - a.id
      if (sortOrder === 'oldest') return a.id - b.id
      if (sortOrder === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      return 0
    })

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleStudentChange = (studentId) => {
    setFormData((previous) => ({
      ...previous,
      assignedTo: previous.assignedTo.includes(studentId)
        ? previous.assignedTo.filter((id) => id !== studentId)
        : [...previous.assignedTo, studentId]
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      driveLink: '',
      assignedTo: students.map((student) => student.id)
    })

    setAssignAll(true)
    setEditingId(null)
    setShowForm(false)
  }

  // Create or update assignment
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate due date
    const today = getTodayDate()

    if (!formData.dueDate) {
      alert('Please select a due date.')
      return
    }

    if (formData.dueDate < today) {
      alert('Due date cannot be in the past. Please select today or a future date.')
      return
    }

    if (formData.assignedTo.length === 0) {
      alert('Please select at least one student.')
      return
    }

    const assignmentData = {
      ...formData,
      assignedTo: formData.assignedTo,
      assignAllStudents: assignAll,
      createdBy: user.id
    }

    if (editingId) {
      const existingAssignment = assignments.find(
        (assignment) => assignment.id === editingId
      )

      if (!existingAssignment) return

      updateAssignment({
        ...assignmentData,
        id: editingId,
        submissions: existingAssignment.submissions
      })
    } else {
      addAssignment(assignmentData)
    }

    resetForm()
  }

  // Edit assignment
  const handleEdit = (assignment) => {
    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      driveLink: assignment.driveLink,
      assignedTo: [...assignment.assignedTo]
    })

    setAssignAll(
      assignment.assignAllStudents ??
      assignment.assignedTo.length === students.length
    )

    setEditingId(assignment.id)
    setShowForm(true)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Delete assignment
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id)
    }
  }

  // Statistics
  const totalStudents = students.length

  const completedAssignments = myAssignments.filter(
    (assignment) =>
      assignment.assignedTo.length > 0 &&
      assignment.assignedTo.every((id) =>
        assignment.submissions.includes(id)
      )
  ).length

  const totalSubmissions = myAssignments.reduce(
    (total, assignment) =>
      total +
      assignment.submissions.filter((id) =>
        assignment.assignedTo.includes(id)
      ).length,
    0
  )

  const totalAssignedStudents = myAssignments.reduce(
    (total, assignment) => total + assignment.assignedTo.length,
    0
  )

  const overallProgress = totalAssignedStudents > 0
    ? (totalSubmissions / totalAssignedStudents) * 100
    : 0

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 rounded-full mb-3">
            Admin Workspace
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            Assignment Management
          </h2>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            Create assignments and monitor student performance.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
        >
          + Create Assignment
        </button>

      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium">
              My Assignments
            </p>
            <h3 className="text-4xl font-extrabold mt-3">
              {myAssignments.length}
            </h3>
            <p className="text-xs text-blue-100 mt-2">
              Assignments created by you
            </p>
          </div>
          <span className="absolute right-4 bottom-0 text-7xl opacity-15">
            📚
          </span>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg">
          <div className="relative z-10">
            <p className="text-purple-100 text-sm font-medium">
              Total Students
            </p>
            <h3 className="text-4xl font-extrabold mt-3">
              {totalStudents}
            </h3>
            <p className="text-xs text-purple-100 mt-2">
              Registered students
            </p>
          </div>
          <span className="absolute right-4 bottom-0 text-7xl opacity-15">
            👥
          </span>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-700 text-white p-5 sm:p-6 rounded-2xl shadow-lg sm:col-span-2 xl:col-span-1">
          <div className="relative z-10">
            <p className="text-green-100 text-sm font-medium">
              Fully Completed
            </p>
            <h3 className="text-4xl font-extrabold mt-3">
              {completedAssignments}
            </h3>
            <p className="text-xs text-green-100 mt-2">
              Assignments completed by all assigned students
            </p>
          </div>
          <span className="absolute right-4 bottom-0 text-7xl opacity-15">
            ✓
          </span>
        </div>

      </div>

      {/* Overall Submission Progress */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 sm:p-7 rounded-2xl shadow-sm mb-9">

        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Overall Submission Progress
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Student submission overview
            </p>
          </div>

          <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {Math.round(overallProgress)}%
          </span>
        </div>

        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-2 mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>{totalSubmissions} submissions received</span>
          <span>{totalAssignedStudents - totalSubmissions} remaining</span>
        </div>

      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 sm:p-7 rounded-2xl shadow-lg mb-9">

          <div className="flex justify-between items-center gap-3 mb-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Assignment Details
              </span>

              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                {editingId ? 'Edit Assignment' : 'Create New Assignment'}
              </h3>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600"
              aria-label="Close form"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter assignment title"
                className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter assignment description"
                rows="4"
                className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  required
                  className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Select today or a future date.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                  Google Drive Link
                </label>

                <input
                  type="url"
                  name="driveLink"
                  value={formData.driveLink}
                  onChange={handleChange}
                  required
                  placeholder="https://drive.google.com/..."
                  className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            {/* Student Selection */}
            <div className="border border-gray-100 dark:border-slate-700 rounded-2xl p-4 sm:p-5">

              <div className="mb-4">
                <h4 className="font-bold text-slate-800 dark:text-white">
                  Assign To Students
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Choose all students or select individual students.
                </p>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assignAll}
                  onChange={(e) => {
                    const checked = e.target.checked

                    setAssignAll(checked)

                    setFormData((previous) => ({
                      ...previous,
                      assignedTo: checked
                        ? students.map((student) => student.id)
                        : []
                    }))
                  }}
                  className="w-4 h-4 accent-blue-600"
                />

                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  Assign to All Students ({students.length})
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {students.map((student) => (
                  <label
                    key={student.id}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 p-3 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-600 border border-transparent hover:border-blue-200 dark:hover:border-slate-500"
                  >
                    <input
                      type="checkbox"
                      checked={formData.assignedTo.includes(student.id)}
                      onChange={() => {
                        handleStudentChange(student.id)

                        setAssignAll(
                          formData.assignedTo.length === students.length - 1 &&
                          !formData.assignedTo.includes(student.id)
                        )
                      }}
                      className="w-4 h-4 accent-blue-600"
                    />

                    <span className="text-sm font-medium text-slate-700 dark:text-gray-200">
                      {student.name}
                    </span>
                  </label>
                ))}

              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Selected: {formData.assignedTo.length} of {students.length} students
              </p>

            </div>

            {/* Form Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md"
              >
                {editingId ? '✓ Update Assignment' : '+ Create Assignment'}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Assignment List */}
      <div>

        <div className="mb-5">
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
            My Created Assignments
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage assignments and monitor individual student submissions.
          </p>
        </div>

        {/* Search, Filter and Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">

          <input
            type="text"
            placeholder="🔍 Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Students</option>
            <option value="completed">Submitted Students</option>
            <option value="pending">Pending Students</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full min-w-0 border border-gray-200 dark:border-slate-600 rounded-xl p-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2 xl:col-span-1"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueDate">Due Date</option>
          </select>

        </div>

        {/* Empty States */}
        {myAssignments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-10 rounded-2xl text-center">
            <div className="text-5xl mb-4">📋</div>

            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
              No assignments created yet
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Click Create Assignment to add your first assignment.
            </p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-10 rounded-2xl text-center">
            <div className="text-4xl mb-3">🔎</div>

            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
              No matching assignments
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Try changing your search.
            </p>
          </div>
        ) : (

          <div className="space-y-5">

            {filteredAssignments.map((assignment) => {

              const assignedStudents = students.filter((student) =>
                assignment.assignedTo.includes(student.id)
              )

              const submittedCount = assignedStudents.filter((student) =>
                assignment.submissions.includes(student.id)
              ).length

              const progress = assignedStudents.length > 0
                ? (submittedCount / assignedStudents.length) * 100
                : 0

              const visibleStudents = assignedStudents.filter((student) => {
                const submitted = assignment.submissions.includes(student.id)

                if (filterStatus === 'completed') return submitted
                if (filterStatus === 'pending') return !submitted

                return true
              })

              return (
                <div
                  key={assignment.id}
                  className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden"
                >

                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-600" />

                  <div className="p-5 sm:p-6">

                    {/* Assignment Details */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                      <div className="min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Assignment
                        </span>

                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-1 break-words">
                          {assignment.title}
                        </h4>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-6">
                          {assignment.description}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                          📅 Due: {assignment.dueDate}
                        </p>
                      </div>

                      <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="flex-1 sm:flex-none bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20"
                        >
                          ✎ Edit
                        </button>

                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="flex-1 sm:flex-none bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-500/20"
                        >
                          🗑 Delete
                        </button>
                      </div>

                    </div>

                    {/* Class Completion */}
                    <div className="mt-7 bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 sm:p-5">

                      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                        <span className="font-bold text-sm text-slate-800 dark:text-white">
                          Class Completion
                        </span>

                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          {submittedCount} / {assignedStudents.length} Submitted
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-emerald-600 h-3 rounded-full transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {Math.round(progress)}% completion
                      </p>

                    </div>

                    {/* Student Submission Status */}
                    <div className="mt-7">

                      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                        <h5 className="font-bold text-slate-800 dark:text-white">
                          Student Submission Status
                        </h5>

                        <span className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg font-semibold">
                          {assignedStudents.length} Students
                        </span>
                      </div>

                      {assignedStudents.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No students assigned.
                        </p>
                      ) : visibleStudents.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No students in this status.
                        </p>
                      ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                          {visibleStudents.map((student) => {

                            const submitted = assignment.submissions.includes(
                              student.id
                            )

                            return (
                              <div
                                key={student.id}
                                className="flex justify-between items-center gap-2 bg-gray-50 dark:bg-slate-700/70 border border-gray-100 dark:border-slate-600 p-3 rounded-xl"
                              >

                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                                    {student.name.charAt(0).toUpperCase()}
                                  </div>

                                  <span className="text-sm font-semibold text-slate-700 dark:text-gray-200 truncate">
                                    {student.name}
                                  </span>
                                </div>

                                <span
                                  className={`text-xs font-bold px-2.5 py-1.5 rounded-full shrink-0 ${
                                    submitted
                                      ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
                                      : 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400'
                                  }`}
                                >
                                  {submitted ? '✓ Submitted' : 'Pending'}
                                </span>

                              </div>
                            )
                          })}

                        </div>
                      )}

                    </div>

                  </div>
                </div>
              )
            })}

          </div>
        )}
      </div>

    </div>
  )
}

export default AdminDashboard
