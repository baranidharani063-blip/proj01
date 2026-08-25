Step 1: MongoDB Setup (Windows 10)
MongoDB Service Check: Windows Search-la Services open panni, MongoDB Server run aagudha-nu check panna collision avoid aagum.

Local Connection String: mongodb://127.0.0.1:27017/authDB

Step 2: Folder Structure
Ungaludaiya Project folder-kul backend and frontend thani thaniya irukka vendum.

Plaintext
my-app/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
Step 3: Backend Setup & Source Code
Terminal-la backend folder create panni navigate pangu:

Bash
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs
backend/.env file create panni:

Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/authDB
backend/models/User.js

JavaScript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
backend/server.js

JavaScript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 7 Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 7 Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Step 4: Frontend Setup & Source Code (React + Tailwind)
Main directory-ku vandhu React + Tailwind Vite app create pangu:

Bash
cd ..
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer lucide-react
npx tailwindcss init -p
frontend/tailwind.config.js update pangu:

JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
frontend/src/index.css top-la add pangu:

CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
frontend/src/components/Register.jsx

JavaScript
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register({ togglePage }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        setFormData({ name: "", email: "", password: "" });
        togglePage(); // Switch to login after successful register
      }
    } catch (error) {
      alert("Backend connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
      <p className="text-center text-gray-500 mt-2 mb-6">Register to get started</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button onClick={togglePage} className="text-blue-600 font-semibold hover:underline">
          Login
        </button>
      </p>
    </div>
  );
}
frontend/src/components/Login.jsx

JavaScript
import { useState } from "react";

export default function Login({ togglePage }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Backend connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
      <p className="text-center text-gray-500 mt-2 mb-6">Login to your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <button onClick={togglePage} className="text-blue-600 font-semibold hover:underline">
          Register
        </button>
      </p>
    </div>
  );
}
frontend/src/App.jsx

JavaScript
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [isRegisterPage, setIsRegisterPage] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      {isRegisterPage ? (
        <Register togglePage={() => setIsRegisterPage(false)} />
      ) : (
        <Login togglePage={() => setIsRegisterPage(true)} />
      )}
    </div>
  );
}

export default App;
Step 5: How to Run the Project
Start Backend Server:
Terminal 1-la:

Bash
cd backend
node server.js
(Console message: Server running on port 5000 & MongoDB 7 Connected Successfully show aagum)

Start Frontend Server:
Terminal 2-la:

Bash
cd frontend
npm run dev
(Browser-la open panni Register/Login functional test pannalam!)
