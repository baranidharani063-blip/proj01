STEP 1 — Backend packages install

VS Code-ல் backend folder terminal open பண்ணுங்க.

cd backend

Then:

npm install express mongoose cors dotenv

Already install பண்ணியிருந்தால் மீண்டும் செய்ய தேவையில்லை.

STEP 2 — User.js create பண்ணுங்க

Backend-ல்:

backend
 └── models
      └── User.js

User.js:

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

இதுதான் நம்ம User model.

STEP 3 — .env create பண்ணுங்க

backend folder-க்குள்:

backend/
├── models/
│   └── User.js
├── server.js
├── .env
└── package.json

.env:

MONGO_URL=mongodb://localhost:27017/registrationDB
இதன் meaning:
mongodb://
     ↓
MongoDB

localhost
     ↓
உங்க computer

27017
     ↓
MongoDB port

registrationDB
     ↓
நம்ம database name

Atlas connection string இப்போ தேவையில்லை.

STEP 4 — server.js

உங்க server.js-ஐ இப்படி வைத்துக்கோங்க:

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });


// Register API
app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.json({
      message: "Registration successful",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
STEP 5 — MongoDB Server already running

நம்ம முன்னாடி start பண்ணிய MongoDB CMD window-ஐ close பண்ணாதீங்க.

அதில்:

Waiting for connections

இருந்த setup-லேயே MongoDB running.

STEP 6 — Backend run பண்ணுங்க

இப்போ புதிய VS Code terminal open பண்ணுங்க.

Backend folder-ல் இருக்கிறீர்கள் என்பதை confirm:

cd backend

Then:

node server.js
Correct-ஆ இருந்தால்:
MongoDB Connected
Server running on port 5000

இரண்டும் வர வேண்டும். ✅

⚠️ இங்கே STOP

இப்போ React code-ஐ மாற்ற வேண்டாம்.

முதலில் backend சரியாக connect ஆகிறதா பார்க்கணும்.

உங்க terminal-ல்:

MongoDB Connected
Server running on port 5000

வருகிறதா பாருங்க.

STEP 7 — Backend வேலை செய்கிறதா test

Browser open பண்ணி:

http://localhost:5000

போங்க.

நம்ம server.js-ல் / route create பண்ணவில்லை. அதனால் browser-ல்:

Cannot GET /

மாதிரி வந்தாலும் backend running என்பதுதான் முக்கியம். 👍

STEP 8 — இப்போதான் React connect

உங்க current React code-ல் இப்போது:

const handleSubmit = (e) => {
  e.preventDefault();

  alert("Registration successful!");

  console.log(formData);
};

இது MongoDB-க்கு எதுவும் அனுப்பாது.

அதை மட்டும் மாற்றணும்.

Replace with:
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    alert(data.message);

    console.log(data);

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

மற்ற React code-ஐ மாற்ற வேண்டாம். ✅

STEP 9 — React run பண்ணுங்க

Frontend terminal:

npm run dev

Browser-ல் React app open ஆகும்.

உங்க form:

Full Name
[ Barani ]

Email
[ barani@gmail.com ]

Password
[ 123456 ]

[ Register ]
STEP 10 — Register click

Register click பண்ணும்போது:

React
  ↓
handleSubmit()
  ↓
fetch()
  ↓
POST /register
  ↓
Express
  ↓
User model
  ↓
MongoDB

MongoDB-ல்:

registrationDB
      ↓
users
      ↓
User document

create ஆகும்.

STEP 11 — Compass-ல் பார்க்கலாம்

MongoDB Compass-க்கு போங்க.

Initially:

Databases

admin
config
local

இருந்தது.

Register செய்த பிறகு refresh பண்ணுங்க.

இப்போது:

Databases

admin
config
local
registrationDB

வரும். ✅

registrationDB click பண்ணுங்க.

அதுக்குள்:

Collections

users

இருக்கும்.

users click பண்ணினால்:

{
  _id: "...",
  name: "Barani",
  email: "barani@gmail.com",
  password: "123456"
}

மாதிரி data இருக்கும்.

🎉 அதுதான் உங்க React form data MongoDB-ல் save ஆனது.

மிக முக்கியமான 3 terminals

நம்ம project-ல் ஒரே நேரத்தில் 3 things running இருக்கும்:

Terminal 1 — MongoDB
MongoDB Server
↓
localhost:27017

இதைக் close பண்ணக்கூடாது.

Terminal 2 — Backend
cd backend
node server.js

Expected:

MongoDB Connected
Server running on port 5000
Terminal 3 — Frontend
cd frontend
npm run dev
🧠 Simple-ஆ நினைவில் வைக்க
        React
    localhost:5173
          │
          │ fetch()
          ↓
       Express
    localhost:5000
          │
          │ Mongoose
          ↓
       MongoDB
    localhost:27017
          │
          ↓
    registrationDB
          │
          ↓
        users
இப்போ உங்க next immediate step:

Backend terminal-ல் மட்டும்:

node server.js

run பண்ணுங்க.

MongoDB Connected + Server running on port 5000 வருதா என்று சொல்லுங்க. அதுக்கப்புறம் React-ல் handleSubmit மாற்றி actual data save பண்ணுவோம்.
