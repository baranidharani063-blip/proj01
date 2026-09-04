enaku monday test iruku help me. now enaku ipo react project la simple login page venum username gmail password using simple and eaysa tailwind use pani venum near and simple understand pandra maari oru registe page venum

Sure 👍 Monday test-ku prepare aagura maari romba simple React + Tailwind Login & Register page create pannalam. First concepts purinjukittu code type panna easy-a irukkum.

1. Project create pannunga

VS Code terminal:

npm create vite@latest login-register

Select:

React
JavaScript

Then:

cd login-register
npm install
npm install tailwindcss @tailwindcss/vite
2. Tailwind setup

vite.config.js:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

src/index.css:

@import "tailwindcss";
3. Simple Login Page

src/App.jsx la ithai podunga:

import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    alert("Login Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <label className="block mb-2 font-medium">
            Gmail
          </label>

          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          {/* Password */}
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-6"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default App;
இதுல important concepts 👇

1. useState

const [email, setEmail] = useState("");

User type panra Gmail-ah store pannum.

2. onChange

onChange={(e) => setEmail(e.target.value)}

Input-la user type pannumbodhu state update aagum.

3. onSubmit

<form onSubmit={handleLogin}>

Login button click pannumbodhu handleLogin() run aagum.

4. preventDefault()

e.preventDefault();

Form submit aagumbodhu page refresh aagadhu.

4. Simple Register Page

Register page-la Name + Gmail + Password vechukalam.

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister}>

          {/* Name */}
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          {/* Gmail */}
          <label className="block mb-2 font-medium">
            Gmail
          </label>

          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          {/* Password */}
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-6"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default App;
5. Tailwind classes மட்டும் நினைவில் வைக்கவும் 🧠

Test-ku initially intha classes purinjukitta podhum:

Tailwind	Meaning
flex	Flexbox
items-center	Vertical center
justify-center	Horizontal center
min-h-screen	Full screen height
bg-gray-100	Background
bg-white	White background
p-8	Padding
w-96	Width
rounded-lg	Rounded corners
shadow-md	Shadow
text-2xl	Big text
font-bold	Bold
mb-4	Margin bottom
w-full	Full width
border	Border
hover:bg-blue-600	Hover color
Monday test-ku இந்த flow memorize pannunga:
React
 ↓
Component
 ↓
useState
 ↓
Input
 ↓
onChange
 ↓
Form
 ↓
onSubmit
 ↓
handleSubmit()
 ↓
preventDefault()
 ↓
alert / API call

Next step: இதே Login + Register-ஐ 2 separate components (Login.jsx, Register.jsx) + React Router navigation வைத்து ஒரு small project-ஆ எப்படி build பண்ணுவது என்று practice பண்ணினா test-ku இன்னும் useful-aa இருக்கும்.
