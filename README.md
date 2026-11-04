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
git clone YOUR_GITHUB_REPOSITORY_URL
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