# 📋 Leave Management System

A full-stack Leave Management System built using the MERN stack that streamlines the process of applying, tracking, approving, and managing employee leave requests through role-based access control.

> **Developed by Rahul Patra to strengthen my understanding of full-stack development, authentication, authorization, and CRUD operations using the MERN stack.**

---

## 🌐 Live Demo

👉 **[View Live Application](https://your-deployed-url.com)**

> Replace the above URL with your deployed application link.

---

## 📖 About the Project

The Leave Management System is designed to simplify leave request workflows within an organization.

Employees can apply for leave, track request statuses, and manage their leave history, while administrators can review, approve, or reject requests through a dedicated dashboard.

This project helped me gain practical experience in building secure full-stack applications with authentication, role-based access control, protected routes, and database integration.

---

## ✨ Features

### 👨‍💼 Employee Features

* Employee Registration & Login
* JWT Authentication
* Apply for Leave Requests
* View Leave History
* Track Leave Status
* Cancel Pending Requests
* Secure Dashboard Access

---

### 🛡️ Admin Features

* Admin Dashboard
* View All Leave Requests
* Approve Leave Applications
* Reject Leave Applications
* Monitor Employee Activity
* Manage Leave Records

---

### 🔐 Security Features

* JWT-Based Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Access Control (RBAC)
* Secure API Endpoints

---

## 🔄 Leave Approval Workflow

```text
Employee Login
      ↓
Apply for Leave
      ↓
Status: Pending
      ↓
Admin Reviews Request
    ↙            ↘
Approved      Rejected
    ↓              ↓
Employee Receives Updated Status
```

---

## 🛠️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React 18, React Router DOM, Axios |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB, Mongoose                 |
| Authentication | JWT, bcryptjs                     |

---

## 🎯 Learning Objectives

This project was built to practice and improve my understanding of:

* Full-Stack MERN Development
* Authentication & Authorization
* JWT Token Management
* Password Encryption
* REST API Development
* MongoDB Database Operations
* CRUD Functionality
* Role-Based Access Control
* React Routing
* State Management
* Client-Server Communication

---

## 📂 Project Structure

```text
leave-management-system/
│
├── backend/
│   ├── config/         # Database Connection
│   ├── middleware/     # JWT Authentication Middleware
│   ├── models/         # User & Leave Models
│   ├── routes/         # Auth, Admin & Employee Routes
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── App.jsx
        └── styles.css
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/leave-management-system.git
```

```bash
cd leave-management-system
```

---

## Backend Setup

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Start Backend Server

```bash
npm run dev
```

---

## Frontend Setup

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

---

## 🚀 Application URLs

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## 📊 Core Functionalities

### Employee

* Register Account
* Login Securely
* Submit Leave Requests
* Track Leave Status
* View Leave History
* Cancel Requests

### Administrator

* View Employee Requests
* Approve Leaves
* Reject Leaves
* Manage Leave Records
* Monitor System Activity

---

## 🎓 Learning Outcomes

Through this project, I gained hands-on experience with:

* Building RESTful APIs
* Implementing JWT Authentication
* Managing User Roles
* Creating Protected Routes
* Connecting React with Express APIs
* Working with MongoDB and Mongoose
* Structuring Full-Stack Applications
* Handling User Authentication Flows

---

## 👨‍💻 Developer

**Rahul Patra**

* GitHub: https://github.com/patraRahul5678

---

## 📄 License

This project is shared for educational and portfolio purposes.

---

⭐ If you found this project interesting, consider giving the repository a star!
