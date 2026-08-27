const http = require("http");

// Create Server
const server = http.createServer((req, res) => {

    // GET /
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Welcome to Home Page");

    }

    // GET /about
    else if (req.method === "GET" && req.url === "/about") {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("This is About Page");

    }

    // GET /products
    else if (req.method === "GET" && req.url === "/products") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        const products = [
            {
                id: 1,
                name: "Laptop",
                price: 50000
            },
            {
                id: 2,
                name: "Mobile",
                price: 20000
            }
        ];

        res.end(JSON.stringify(products));

    }

    // Page Not Found
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");

    }

});

// Start Server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
