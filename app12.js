1. Final folder structure

Create one main folder:

register-app/
│
├── client/                    ← React + Tailwind
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── server/                    ← Node + Express + MongoDB
    ├── models/
    │   └── User.js
    │
    ├── .env
    ├── server.js
    └── package.json

That's all. No controller/routes folders for this simple project.

2. Create React frontend

Open VS Code terminal:

mkdir register-app
cd register-app

Create React:

npm create vite@latest client -- --template react

Then:

cd client
npm install

Install Axios:

npm install axios

Install Tailwind:

npm install tailwindcss @tailwindcss/vite
3. Tailwind setup

Open:

client/vite.config.js

Replace everything with:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
});
4. CSS

Open:

client/src/index.css

Delete everything and put:

@import "tailwindcss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
5. Register page

Create:

client/src/pages/Register.jsx

Full code:

import { useState } from "react";
import axios from "axios";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/register",
        {
          username,
          email,
          password
        }
      );

      setMessage(response.data.message);

      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Register your account
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          {/* Username */}

          <div>
            <label className="block mb-1 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gmail */}

          <div>
            <label className="block mb-1 font-medium">
              Gmail
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;
6. Login page

Create:

client/src/pages/Login.jsx

Full code:

import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password
        }
      );

      setMessage(response.data.message);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* Gmail */}

          <div>
            <label className="block mb-1 font-medium">
              Gmail
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
7. App.jsx

Open:

client/src/App.jsx

Replace everything:

import Register from "./pages/Register";

function App() {
  return <Register />;
}

export default App;

For now, this directly shows the Register page.

8. main.jsx

Open:

client/src/main.jsx

Use:

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
9. Frontend test

Run:

npm run dev

Open:

http://localhost:5173

Register page வரும்.

But Register click பண்ணாதீங்க இன்னும். Backend create பண்ணிய பிறகு தான் database save ஆகும்.

10. Create backend

Open a new VS Code terminal.

Go back:

cd ..

You should be here:

register-app/

Create server:

mkdir server
cd server

Initialize:

npm init -y

Install:

npm install express mongoose cors dotenv bcryptjs
11. Backend structure

Create:

server/
│
├── models/
│   └── User.js
│
├── .env
├── server.js
└── package.json

Create models folder.

12. User.js

Create:

server/models/User.js

Code:

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);
13. .env

Create:

server/.env

Put:

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/register_app
Important

Your Compass already shows:

admin
config
local

So we're using that same local MongoDB server.

Don't create anything manually in Compass.

14. server.js

Create:

server/server.js

Full code:

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// MongoDB connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(
      "MongoDB Error:",
      error.message
    );
  });


// Test

app.get("/", (req, res) => {

  res.json({
    message: "Backend is working"
  });

});


// ==========================
// REGISTER
// ==========================

app.post("/register", async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;


    // Check empty fields

    if (
      !username ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }


    // Check existing user

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already registered"
      });

    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Save to MongoDB

    const user = await User.create({

      username,

      email,

      password: hashedPassword

    });


    console.log(
      "New user saved:",
      user.email
    );


    res.status(201).json({

      message:
        "Registration successful"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"

    });

  }

});


// ==========================
// LOGIN
// ==========================

app.post("/login", async (req, res) => {

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


    res.json({

      message:
        `Welcome ${user.username}! Login successful`

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"

    });

  }

});


// Server

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});
15. Start backend

In terminal:

cd register-app/server

Then:

node server.js

You should get:

MongoDB Connected
Server running on http://localhost:5000

This is very important.

If you don't get:

MongoDB Connected

don't continue. Send me that error.

16. Start frontend

Open another terminal:

cd register-app/client

Run:

npm run dev

You should get:

http://localhost:5173
17. Now register

Open:

http://localhost:5173

Enter:

Username
testuser

Gmail
test@gmail.com

Password
123456

Click:

Register

Frontend sends:

React
  ↓
Axios
  ↓
POST http://localhost:5000/register
  ↓
Express
  ↓
bcrypt
  ↓
MongoDB

You'll get:

Registration successful
18. Check MongoDB Compass

Now go to Compass.

Refresh.

You should see:

admin
config
local
register_app

Click:

register_app

Then:

users

Then documents.

You should see something like:

{
  "_id": "...",
  "username": "testuser",
  "email": "test@gmail.com",
  "password": "$2b$10$...",
  "createdAt": "...",
  "updatedAt": "..."
}
Notice

Password:

123456

MongoDB-ல் இருக்காது.

Instead:

$2b$10$...

இருக்கும். That's because we're using bcrypt.

19. Login

For now App.jsx register page மட்டும் காட்டுது.

Login test செய்ய temporary-a:

import Login from "./pages/Login";

function App() {
  return <Login />;
}

export default App;

Save.

Browser refresh.

Enter:

Gmail:
test@gmail.com

Password:
123456

Click:

Login

Backend MongoDB-ல email find பண்ணும் → password compare பண்ணும் → correct என்றால்:

Welcome testuser! Login successful
20. Final simple architecture
                    React
                      │
                Tailwind CSS
                      │
                    Axios
                      │
                      ▼
             Node + Express
                      │
               ┌──────┴──────┐
               │             │
           Register        Login
               │             │
               ▼             ▼
             bcrypt       bcrypt.compare
               │             │
               └──────┬──────┘
                      ▼
                  Mongoose
                      │
                      ▼
               MongoDB 7
                      │
                      ▼
              register_app
                      │
                    users
Commands you need every time
Terminal 1 — Backend
cd register-app/server
node server.js

Keep this terminal running.

Terminal 2 — Frontend
cd register-app/client
npm run dev

Then open:

http://localhost:5173

One important correction: registration and login are separate operations. Register click தான் username + Gmail + password-ஐ immediately MongoDB-ல் save செய்யும். Login click existing user-ஐ MongoDB-ல் verify செய்யும்; login itself புதிய user-ஐ மீண்டும் save செய்யாது.
