Yes 👍 orey server.js file-la simple-ah:

const express = require("express");

const app = express();

// Logger Middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.get("/user/1", (req, res) => {
  res.send("User 1");
});

app.post("/login", (req, res) => {
  res.send("Login");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
Console output:
Server running on port 5000
GET /user/1
POST /login

Main point: app.use() → every incoming request-ஐ log பண்ணும் middleware.
