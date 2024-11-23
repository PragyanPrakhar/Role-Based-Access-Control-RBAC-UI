# Role-Based Access Control (RBAC) UI

This project implements a Role-Based Access Control (RBAC) system using React and Redux for state management. Users can log in and select a role (Admin, Editor, Viewer). Each role has specific permissions, and the Admin can manage permissions for other roles. The UI is designed for frontend functionality, fetching user data from an external API.

## 🌟 Overview

- **Admin**: Full access, including editing, deleting users, and managing role permissions.
- **Editor**: Permissions to view and edit information.
- **Viewer**: Permissions to only view details.

## 🚀 Features

- Role-based Login Functionality: Implemented with dynamic role permissions.
- User Management: Admins can view, edit,and delete user details.
- Adding New User: Admin can add the new user.
- Permission Customization: Admins can control and update role-based permissions.
- Search Functionality: Users can search for other users by name.
- Sorting Feature: Users can sort the list by age, both ascending and descending.
- API Integration: Fetches user data from DummyJSON API


## 🛠️ Technologies Used

- **React** with Vite for frontend development.
- **Redux** for state and data management.
- **Tailwind CSS** for styling.
- External API: [DummyJSON](https://dummyjson.com/users).

## 🖥️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PragyanPrakhar/Role-Based-Access-Control-RBAC-UI.git
   cd Role-Based-Access-Control-RBAC-UI
2. **Install dependencies:**:
    npm install
3. **Run the development server**:
    npm run dev
4. **Open the app**:
    Navigate to http://localhost:5173 in your browser.

## 📂 Project Structure
    src/
    │
    ├── components/      # UI components for roles, user management, etc.
    ├── utils/           # Redux store, actions, reducers. 
    ├── App.jsx          # Entry point of the application.


## **🎥 Demo
Check out the live demo of MovieMind at: https://movie-mind-iota.vercel.app/