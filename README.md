# Joineazy – Assignment & Review Dashboard

Joineazy is a responsive assignment management platform developed using React.js and Tailwind CSS. It provides separate dashboards for students and administrators to manage assignments, submit work, track progress, and monitor completion status.

## Features

### Student Dashboard
- View all assigned assignments.
- Check assignment descriptions and due dates.
- Access assignment links.
- Submit assignments with confirmation.
- Track submission status and overall progress.
- Search, filter, and sort assignments.
- Identify overdue assignments.

### Admin Dashboard
- Create, edit, and delete assignments.
- Assign tasks to all students or selected students.
- Track individual student submission statuses.
- Monitor assignment completion progress.
- Search and sort assignments.
- View assignments created by the logged-in administrator.

### Additional Features
- Separate Student and Admin login.
- Role-based dashboard access.
- LocalStorage data persistence.
- Responsive design for mobile, tablet, and desktop.
- Dark mode.
- Modern and user-friendly interface.

## Tech Stack

- React.js
- JavaScript
- Tailwind CSS
- Vite
- HTML5
- LocalStorage

## Demo Login Credentials

### Admin 1
- Email: `admin1@joineazy.com`
- Password: `Admin@123`

### Admin 2
- Email: `admin2@joineazy.com`
- Password: `Admin@123`

### Student Accounts
- `shiva@joineazy.com`
- `student2@joineazy.com`
- `student3@joineazy.com`
- `student4@joineazy.com`
- `student5@joineazy.com`

**Note:** Student accounts must be registered through the Sign Up page before logging in. Use the password created during registration.

This project uses mock authentication and browser LocalStorage for demonstration purposes. It is not a production authentication system.

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/bollikondashiva-02/Joineazy.git
```

2. Navigate to the project directory:

```bash
cd Joineazy
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## Data Storage

The application uses browser LocalStorage to store user information, assignments, submission statuses, and dark mode preferences.

Data is stored locally in the browser and is not synchronized across different devices or browsers.

## Project Purpose

This project was developed as part of the Joineazy Frontend Intern Assignment. It demonstrates practical skills in React development, responsive UI design, role-based dashboards, assignment management, and client-side data persistence.

## Project Folder Structure

```text
Joineazy/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AssignmentContext.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── StudentDashboard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```


## Component Architecture

- **App.jsx:** Main application component that manages the login and signup views and displays the dashboard after authentication.
- **Dashboard.jsx:** Displays the appropriate dashboard based on the logged-in user's role.
- **Login.jsx:** Handles user login for Admin and Student roles.
- **Signup.jsx:** Handles new student registration.
- **AdminDashboard.jsx:** Allows administrators to manage assignments, assign students, and track submissions.
- **StudentDashboard.jsx:** Allows students to view assignments, submit work, and track their progress.
- **Navbar.jsx:** Provides the dashboard navigation header.
- **Sidebar.jsx:** Provides navigation options and logout functionality.
- **AuthContext.jsx:** Manages authentication, user information, registration, and login state.
- **AssignmentContext.jsx:** Manages assignment data and student assignment submissions.

## Key Design Decisions

1. **Role-Based Access:** Separate Admin and Student dashboards provide role-specific functionality.
2. **Context API:** React Context API is used to share authentication and assignment data across components.
3. **LocalStorage:** Browser LocalStorage maintains user information, assignments, submission status, and preferences across page refreshes.
4. **Responsive Design:** Tailwind CSS is used to create a responsive interface for desktop, tablet, and mobile devices.
5. **Reusable Components:** Shared components such as Navbar and Sidebar help maintain consistent UI design.
6. **Assignment Tracking:** Assignment status and completion progress help administrators monitor student submissions.
7. **Client-Side Validation:** Form validation and due-date checks help prevent invalid assignment operations.