Sure 👍 4 and 5 separate projects/files ah kudukuren. Postman-la epdi test panrathum separate-ah.
4. Middleware Logging
server.js
Writing
const express = require("express");

const app = express();

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Test API
app.get("/user/:id", (req, res) => {
    res.json({
        message: "User details",
        userId: req.params.id
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
Explanation
const express = require("express");
Express-ah import panrom.
const app = express();
Express application create panrom.
app.use((req, res, next) => {
Idhu middleware. Every incoming request-ku first execute aagum.
console.log(`${req.method} ${req.url}`);
Request method and URL console-la print pannum.
Example:
GET /user/1
POST /login
next();
Request-ah next handler-ku send pannum.
Postman Test
Method: GET
URL:
http://localhost:3000/user/1
Send click pannunga.
Postman response:
{
    "message": "User details",
    "userId": "1"
}
Terminal-la:
Server running on port 3000
GET /user/1
5. POST Request with JSON Body
server.js
Writing
const express = require("express");

const app = express();

// Middleware to read JSON body
app.use(express.json());

// Login POST API
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    res.json({
        message: "Login successful",
        user: username
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
Explanation
app.use(express.json());
Postman-la JSON body send pannumbodhu, adha req.body la read panna idhu required.
app.post("/login", (req, res) => {
POST /login request vandha indha function execute aagum.
const { username, password } = req.body;
JSON body-la irukkura username and password values-ah edukkrom.
Postman
Method: POST
URL:
http://localhost:3001/login
Body → raw → JSON
{
    "username": "admin",
    "password": "1234"
}
Send click pannunga.
Response:
{
    "message": "Login successful",
    "user": "admin"
}
Important: 4-ku 3000, 5-ku 3001 use panniruken. Rendu server-um same time run panna port conflict varadhu.
