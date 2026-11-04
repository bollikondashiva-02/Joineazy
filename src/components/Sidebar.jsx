
function Sidebar({ user, logout }) {
  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-5 sm:p-6 flex flex-col shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-7 md:mb-12">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
          J
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">
            Joineazy
          </h1>
          <p className="text-xs text-slate-400">
            Assignment Workspace
          </p>
        </div>
      </div>

      {/* Navigation Label */}
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>
      </div>

      {/* Dashboard Menu */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/20 border border-blue-400/20 mb-8">
        <span className="text-xl">▦</span>
        <span className="font-semibold text-sm">Dashboard</span>
      </div>

      {/* Account Information */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">
          Account Information
        </p>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-lg font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-sm truncate">
              {user.name}
            </h2>

            <span className="text-xs text-blue-300 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-0 md:mt-auto">
        <div className="hidden md:block border-t border-white/10 pt-5 mb-5">
          <p className="text-xs text-slate-400">
            Stay organized. Keep learning.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            © 2026 Joineazy
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-400/20 p-3 rounded-xl font-semibold text-sm transition-all duration-200"
        >
          <span>↪</span>
          Logout
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
