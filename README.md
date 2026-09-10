# Medicare – Doctor Appointment System

Medicare is a modern doctor appointment booking web application built with **React.js, Vite and Tailwind CSS**. It allows patients to create accounts, browse doctors, book appointments, manage their profiles and view their appointments.

The project also includes an **Admin Panel** for managing doctors and appointments.

## 🚀 Features

### 👤 User Features

- User registration and login
- Browse available doctors
- Search and filter doctors
- View doctor details
- Check available appointment slots
- Book doctor appointments
- View booked appointments
- Cancel appointments
- Manage patient profile
- Upload profile picture
- Update personal and medical information
- Toast notifications for success and error messages
- Protected user functionality using JWT authentication

### 🛡️ Admin Features

- Admin login
- Admin authentication using JWT
- Add new doctors
- View all doctors
- Change doctor availability
- View all appointments
- Manage doctor information
- Dashboard for appointment and doctor statistics

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- React Toastify
- Lucide React
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Cloudinary
- Razorpay

## 📁 Project Structure

```text
medicare/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── admin/
    ├── src/
    ├── public/
    ├── .env
    └── package.json
```

## 🔐 Authentication

Medicare uses **JWT-based authentication**.

### User Authentication

```text
POST /api/user/register
POST /api/user/login
GET  /api/user/get-profile
PUT  /api/user/update-profile
```

### Admin Authentication

```text
POST /api/admin/login
```

Authentication tokens are sent through request headers.

```text
token: <USER_JWT_TOKEN>
```

For admin requests:

```text
aToken: <ADMIN_JWT_TOKEN>
```

## 🩺 Doctor APIs

```text
GET  /api/admin/doctor-list
POST /api/admin/add-doctor
POST /api/admin/change-availability
```

Doctors can be added and managed through the Admin Panel.

## 📅 Appointment APIs

```text
POST /api/user/book-appointment
GET  /api/user/get-appointments
POST /api/user/cancel-appointment
```

Users can select a doctor, date and available time slot before booking an appointment.

## 💳 Payment Integration

The application is designed to support online appointment payments using **Razorpay**.

The appointment amount is based on the doctor's consultation fee.

## ☁️ Cloudinary

Cloudinary is used for image storage.

It is used for:

- Doctor profile images
- Patient profile images

## ⚙️ Environment Variables

Create a `.env` file inside the frontend:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_CURRENCY_SYMBOL=₹
```

Backend `.env` example:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> Never commit `.env` files or secret keys to GitHub.

## ▶️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start frontend

```bash
npm run dev
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

### 5. Start backend

```bash
npm run dev
```

The frontend will run on the Vite development server and the backend will run on:

```text
http://localhost:8000
```

## 🧪 API Testing

APIs can be tested using **Postman**.

### User Login

```http
POST /api/user/login
Content-Type: application/json
```

Example:

```json
{
  "email": "patient@example.com",
  "password": "123456"
}
```

### Admin Login

```http
POST /api/admin/login
Content-Type: application/json
```

Example:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

## 🔒 Security

- Passwords are hashed using Bcrypt
- JWT is used for authentication
- Protected routes use authentication middleware
- Admin and user authentication are handled separately
- Environment variables are used for sensitive configuration

## 📱 Pages

### User Panel

- Home
- Doctors
- Appointment
- Login
- Create Account
- About
- Contact
- My Profile
- My Appointments

### Admin Panel

- Admin Login
- Dashboard
- Add Doctor
- Doctor List
- All Appointments

## 🎯 Future Improvements

- Online payment with Razorpay
- Email/SMS appointment notifications
- Doctor dashboard
- Appointment reminders
- Advanced doctor search
- Prescription management
- Medical reports upload
- Patient history management

## 👨‍💻 Developer

**Kamlesh Bisht**

B.Tech Computer Science & Engineering

### Skills Used

React.js • Node.js • Express.js • MongoDB • JavaScript • Tailwind CSS • REST API • JWT • Cloudinary • Razorpay

---

⭐ If you find this project useful, consider giving it a star.