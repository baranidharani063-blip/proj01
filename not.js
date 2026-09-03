```js
const express = require("express");

const app = express();

// JSON body read panna
app.use(express.json());

// POST /login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  res.json({
    message: "Login successful",
    user: username
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```
