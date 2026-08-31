1. Create project

Open VS Code terminal:

mkdir user-management-api
cd user-management-api
npm init -y

Install packages:

npm install express mongoose
Why these two?
express  → Create API/server
mongoose → Connect Node.js with MongoDB
2. Create folder structure

Create this:

user-management-api/
│
├── node_modules/
├── package.json
├── package-lock.json
└── server.js

For now, one server.js file is enough.

3. Start MongoDB

If MongoDB is installed as a Windows service, it may already be running.

Open MongoDB Compass.

Connect using:

mongodb://127.0.0.1:27017

or:

mongodb://localhost:27017

You should see your local MongoDB server.

4. MongoDB database name

We are going to use:

Database: userManagementDB
Collection: users

You don't need to manually create the database or collection.

Mongoose will create them automatically when we insert the first user.

5. server.js

Now put this complete code:

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/userManagementDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

// User Model
const User = mongoose.model("User", userSchema);


// =========================
// GET - Get all users
// =========================

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
});


// =========================
// POST - Create user
// =========================

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: savedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
});


// =========================
// PUT - Update user
// =========================

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});


// =========================
// DELETE - Delete user
// =========================

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
6. Understand the MongoDB connection

இந்த code:

mongoose.connect(
  "mongodb://127.0.0.1:27017/userManagementDB"
)

இதில்:

mongodb://       → MongoDB protocol

127.0.0.1        → Your computer

27017            → MongoDB default port

userManagementDB → Database name

So:

Node.js
   ↓
Mongoose
   ↓
MongoDB
   ↓
userManagementDB
   ↓
users collection
7. Run the server

Terminal:

node server.js

You should get:

Server running at http://localhost:3000
MongoDB connected successfully

🔥 If you see MongoDB connected successfully, connection is working.

8. POST — Create User

Now open Postman.

Select:

POST

URL:

http://localhost:3000/users

Go to:

Body
 ↓
raw
 ↓
JSON

Enter:

{
  "name": "Arun",
  "email": "arun@gmail.com",
  "password": "Arun@123"
}

Click Send.

You should get something like:

{
  "message": "User created successfully",
  "user": {
    "_id": "68b...",
    "name": "Arun",
    "email": "arun@gmail.com",
    "password": "Arun@123",
    "__v": 0
  }
}
Important

MongoDB automatically creates:

_id

This is MongoDB's unique ID.

It will look something like:

68b7c2e8f1a2345678901234

Copy that ID. We'll use it for PUT and DELETE.

9. Check MongoDB Compass

Open MongoDB Compass.

Refresh your connection.

You should see:

userManagementDB
    ↓
collections
    ↓
users

Click:

users

You should see your document:

{
  "_id": "...",
  "name": "Arun",
  "email": "arun@gmail.com",
  "password": "Arun@123"
}

🎉 Now your Postman data is actually stored in MongoDB.

10. GET — Get all users

Postman:

GET
http://localhost:3000/users

Click Send.

Response:

[
  {
    "_id": "68b...",
    "name": "Arun",
    "email": "arun@gmail.com",
    "password": "Arun@123"
  }
]

This code is responsible:

const users = await User.find();

Meaning:

MongoDB
   ↓
Find all users
   ↓
Send JSON response
11. POST another user

Again:

POST
http://localhost:3000/users

Body:

{
  "name": "Kumar",
  "email": "kumar@gmail.com",
  "password": "Kumar@123"
}

Send.

Now MongoDB contains:

users
│
├── Arun
└── Kumar
12. GET again
GET
http://localhost:3000/users

Now response:

[
  {
    "_id": "....",
    "name": "Arun",
    "email": "arun@gmail.com",
    "password": "Arun@123"
  },
  {
    "_id": "....",
    "name": "Kumar",
    "email": "kumar@gmail.com",
    "password": "Kumar@123"
  }
]
13. PUT — Update user

Copy Kumar's _id.

Example:

68b7c2e8f1a2345678901234

Postman:

PUT
http://localhost:3000/users/68b7c2e8f1a2345678901234

Body → raw → JSON:

{
  "name": "Kumar Raj",
  "email": "kumarraj@gmail.com",
  "password": "Kumar@456"
}

Click Send.

Response:

{
  "message": "User updated successfully",
  "user": {
    "_id": "68b...",
    "name": "Kumar Raj",
    "email": "kumarraj@gmail.com",
    "password": "Kumar@456"
  }
}

MongoDB also gets updated.

14. DELETE — Delete user

Copy the user's _id.

Postman:

DELETE
http://localhost:3000/users/68b7c2e8f1a2345678901234

Click Send.

Response:

{
  "message": "User deleted successfully",
  "user": {
    "_id": "68b...",
    "name": "Kumar Raj",
    "email": "kumarraj@gmail.com",
    "password": "Kumar@456"
  }
}

Now refresh MongoDB Compass.

That user will be gone. ✅
