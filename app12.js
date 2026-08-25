Sure 👍. Ippo zero-lendhu full project setup pannuvom.

Project:

Frontend: React + Vite + Tailwind CSS
Backend: Node.js + Express
Database: MongoDB 7.x
Authentication: bcrypt + JWT
Register fields: Username + Gmail + Password மட்டும்
Login: Gmail + Password

Your previous structure-la React frontend and Express/MongoDB backend separate-a irundhadhu.

STEP 1 — Required software

Windows 10-la install pannirukkanum:

Node.js
MongoDB 7.x
VS Code

CMD open panni check pannunga:

node -v
npm -v

MongoDB:

mongod --version

MongoDB 7.x output varanum.

STEP 2 — MongoDB start pannunga

CMD Administrator mode-la open pannunga.

net start MongoDB

Already running-na:

The MongoDB service is already started.

MongoDB work aagudha check panna:

mongosh

Inside MongoDB:

show dbs

Then:

exit
STEP 3 — Main project create pannunga

VS Code open pannunga.

Terminal:

mkdir register-app
cd register-app

Ippo structure:

register-app/
STEP 4 — React frontend create pannunga

Main project folder-la:

npm create vite@latest client -- --template react

Then:

cd client

Install packages:

npm install

Axios and React Router:

npm install axios react-router-dom

Tailwind:

npm install tailwindcss @tailwindcss/vite
STEP 5 — Tailwind configure pannunga

client/vite.config.js open pannunga.

Existing content-a remove panni:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
STEP 6 — CSS

client/src/index.css

Existing code delete pannitu:

@import "tailwindcss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
STEP 7 — Frontend folder structure

client/src inside unnecessary files irundha remove pannitu indha structure maintain pannunga:

client/
│
├── src/
│   ├── pages/
│   │   ├── Register.jsx
│   │   └── Login.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
STEP 8 — App.jsx

client/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/register" />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
STEP 9 — Register page

First folder create pannunga:

client/src/pages

Inside:

Register.jsx

Full code:

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.token);

      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold">
              R
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Register your new account
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

            {/* Gmail */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gmail
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Gmail"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Register
            </button>

          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
STEP 10 — Login page

client/src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login successful!");

      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-8">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold">
              L
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your account
            </p>

          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Gmail */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Gmail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Gmail"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-indigo-600"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
STEP 11 — main.jsx

client/src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
STEP 12 — Frontend test pannunga

Client folder-la irundhu:

npm run dev

Browser:

http://localhost:5173

Register page automatically open aagum.

Register UI
Create Account

Username
[ Enter username ]

Gmail
[ Enter your Gmail ]

Password
[ Enter password ]

[ Register ]

Already have an account? Login

Frontend மட்டும் test panna page work aagum, but Register click pannumbodhu backend running irukkanum.

STEP 13 — Backend create pannunga

Ippo frontend terminal-a stop panna vendam.

VS Code-la new terminal open pannunga.

Current location:

register-app/client

One level back:

cd ..

Then:

mkdir server
cd server

Initialize Node project:

npm init -y
STEP 14 — Backend packages install
npm install express mongoose cors dotenv bcryptjs jsonwebtoken

Development package:

npm install -D nodemon
STEP 15 — Backend folder structure

server inside:

server/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── server.js
└── package.json
STEP 16 — MongoDB connection

Create:

server/config/db.js

Code:

const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    const connection = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );

  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;
STEP 17 — .env

server/.env

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/register_app

JWT_SECRET=my_secret_key_123456789

MongoDB database name:

register_app

Database manually create panna vendiya avasiyam illa.

First user register pannumbodhu MongoDB automatically create pannum.

STEP 18 — User Model

Create:

server/models/User.js

Code:

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);
STEP 19 — Auth Controller

Create:

server/controllers/authController.js

Full code:

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================
// REGISTER
// =========================

const registerUser = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;


    // Check fields

    if (!username || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }


    // Check existing email

    const existingUser =
      await User.findOne({ email });


    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Create user

    const user = await User.create({

      username,

      email,

      password: hashedPassword

    });


    // Create JWT

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    res.status(201).json({

      message: "Registration successful",

      token,

      user: {

        id: user._id,

        username: user.username,

        email: user.email

      }

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Server error"

    });

  }

};


// =========================
// LOGIN
// =========================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Check fields

    if (!email || !password) {

      return res.status(400).json({

        message:
          "Email and password are required"

      });

    }


    // Find user

    const user =
      await User.findOne({ email });


    if (!user) {

      return res.status(401).json({

        message:
          "Invalid email or password"

      });

    }


    // Compare password

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        message:
          "Invalid email or password"

      });

    }


    // JWT

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    res.status(200).json({

      message: "Login successful",

      token,

      user: {

        id: user._id,

        username: user.username,

        email: user.email

      }

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Server error"

    });

  }

};


module.exports = {

  registerUser,

  loginUser

};
STEP 20 — Auth Routes

Create:

server/routes/authRoutes.js
const express = require("express");

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const router = express.Router();


// Register
router.post(
  "/register",
  registerUser
);


// Login
router.post(
  "/login",
  loginUser
);


module.exports = router;
STEP 21 — Main server

Create:

server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");


// Load environment variables
dotenv.config();


// Connect MongoDB
connectDB();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


// Test route

app.get("/", (req, res) => {

  res.json({
    message: "Server is running"
  });

});


// Port

const PORT =
  process.env.PORT || 5000;


// Start server

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});
STEP 22 — package.json

server/package.json open pannunga.

scripts change pannunga:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

Example full:

{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
STEP 23 — Backend start

Backend terminal:

cd register-app/server

Then:

npm run dev

Correct-a irundha:

MongoDB Connected: 127.0.0.1
Server running on http://localhost:5000

Browser-la:

http://localhost:5000

You should see:

{
  "message": "Server is running"
}
STEP 24 — Ippo rendu terminal run aaganum
Terminal 1 — Backend
cd register-app/server
npm run dev

Output:

MongoDB Connected: 127.0.0.1
Server running on http://localhost:5000
Terminal 2 — Frontend
cd register-app/client
npm run dev

Output:

Local: http://localhost:5173/
STEP 25 — Register test

Browser:

http://localhost:5173/register

Enter:

Username: arun

Gmail: arun@gmail.com

Password: 123456

Click:

Register

Flow:

React
  ↓
Axios
  ↓
POST /api/auth/register
  ↓
Express
  ↓
authController
  ↓
bcrypt
  ↓
Mongoose
  ↓
MongoDB

Registration successful aana:

Registration successful!

Then automatically:

/login
STEP 26 — MongoDB-la check pannunga

CMD open:

mongosh

Then:

show dbs

You should see:

register_app

Then:

use register_app

Then:

show collections

You should see:

users

Then:

db.users.find()

Output roughly:

{
  "_id": ObjectId("..."),
  "username": "arun",
  "email": "arun@gmail.com",
  "password": "$2b$10$....",
  "createdAt": "...",
  "updatedAt": "..."
}

Password $2b$... madhiri hash-a irukkum. Plain password MongoDB-la save aagathu.

STEP 27 — Login test

Browser:

http://localhost:5173/login

Enter:

Gmail:
arun@gmail.com

Password:
123456

Click:

Login

Backend:

MongoDB
   ↓
Find email
   ↓
bcrypt.compare()
   ↓
Password correct
   ↓
JWT
   ↓
React

Then:

Login successful!
Final complete structure
register-app/
│
│
├── client/
│   │
│   ├── node_modules/
│   │
│   ├── src/
│   │   │
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
│
├── server/
│   │
│   ├── node_modules/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
Overall architecture
                 FRONTEND
        React + Tailwind + Axios
                  │
                  │ HTTP
                  ↓
                 BACKEND
          Node.js + Express
                  │
          ┌───────┴───────┐
          ↓               ↓
       bcrypt            JWT
          │
          ↓
        Mongoose
          │
          ↓
      MongoDB 7.x
Commands மட்டும் நினைவில் வைத்துக்கோங்க

Backend:

cd register-app/server
npm run dev

Frontend:

cd register-app/client
npm run dev

Frontend URL:

http://localhost:5173/register

Backend URL:

http://localhost:5000

MongoDB:

mongodb://127.0.0.1:27017/register_app

இப்போ இந்த setup-la Register + Login + MongoDB save + password hashing + JWT complete-a work ஆகும். Next useful step, இதை run பண்ணும்போது error வந்தால் terminal-la வரும் exact error message அனுப்பினா, அந்த error-ஐ வைத்து step-by-step fix பண்ணலாம்.
