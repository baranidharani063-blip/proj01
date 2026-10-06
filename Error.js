1. Project Structure
mern-ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Cart.jsx
│   │   │
│   │   ├── redux/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── Product.js
    │   └── Cart.js
    │
    ├── routes/
    │   ├── productRoutes.js
    │   └── cartRoutes.js
    │
    ├── server.js
    ├── .env
    └── package.json
2. Create Project

PowerShell:

mkdir mern-ecommerce
cd mern-ecommerce

Create frontend:

npm create vite@latest frontend

Select:

React
JavaScript

Then:

cd frontend
npm install

Install packages:

npm install react-router-dom
npm install @reduxjs/toolkit react-redux

Tailwind:

npm install tailwindcss @tailwindcss/vite
3. Tailwind Setup
frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
frontend/src/index.css
@import "tailwindcss";
4. Backend Create

Go back:

cd ..
mkdir backend
cd backend

Initialize:

npm init -y

Install:

npm install express mongoose cors dotenv

Install nodemon:

npm install -D nodemon
5. Backend .env

Create:

backend/.env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce
6. Product Model

Create:

backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
Simple explanation
name        → product name
price       → product price
image       → product image
description → product details
category    → Electronics / Fashion etc.
7. Cart Model

Create:

backend/models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    productId: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);

இதுதான் முக்கியம்.

User:

Add to Cart

பண்ணும்போது MongoDB-ல் save ஆகும்.

8. Product Routes

Create:

backend/routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
9. Cart Routes

Create:

backend/routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// GET cart
router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.params.userId,
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE CART ITEM
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Cart item deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
10. Backend Server

Create:

backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });
11. Backend package.json

Change:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

Run backend:

npm run dev

You should see:

MongoDB Connected
Server running on http://localhost:5000
12. RTK Query Setup

Now frontend.

Create:

frontend/src/redux/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),

  tagTypes: ["Products", "Cart"],

  endpoints: (builder) => ({

    // Get all products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    // Get single product
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // Add product
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),

      invalidatesTags: ["Products"],
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),

    // Get cart
    getCart: builder.query({
      query: (userId) => `/cart/${userId}`,
      providesTags: ["Cart"],
    }),

    // Add cart
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),

      invalidatesTags: ["Cart"],
    }),

    // Delete cart
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
} = api;

This is your RTK Query API integration.

13. Redux Store

Create:

frontend/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
14. main.jsx

Replace:

frontend/src/main.jsx

with:

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
15. App.jsx
frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
16. Navbar

Create:

frontend/src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          ShopEasy
        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>

          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>

          <Link
            to="/cart"
            className="bg-white text-blue-600 px-4 py-2 rounded"
          >
            Cart
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4">

          <Link
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>

        </div>
      )}

    </nav>
  );
}

export default Navbar;
இதில் என்ன topics?
useState
Link
useNavigate
React Router
Tailwind
Mobile Toggle
Navbar
17. Footer

Create:

frontend/src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold mb-3">
            ShopEasy
          </h2>

          <p className="text-gray-400">
            Simple MERN Stack E-Commerce Website.
          </p>
        </div>

        <div>
          <h2 className="font-bold mb-3">
            Quick Links
          </h2>

          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div>
          <h2 className="font-bold mb-3">
            Contact
          </h2>

          <p>support@shopeasy.com</p>
          <p>+91 9876543210</p>
        </div>

      </div>

      <div className="text-center border-t border-gray-700 py-4">
        © 2026 ShopEasy. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
18. Product Card

Create:

frontend/src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="text-xl font-bold text-blue-600 mt-2">
          ₹{product.price}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product._id}`);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
19. Home Page

Create:

frontend/src/pages/Home.jsx
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/api";

function Home() {

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero */}

      <section className="bg-blue-600 text-white py-20 px-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to ShopEasy
        </h1>

        <p className="mt-4 text-lg">
          Find your favorite products at best prices.
        </p>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-8">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;
20. Product Details Page

இதுதான் நீ கேட்ட:

Card click → Product Details → Page navigate

Create:

frontend/src/pages/ProductDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductQuery,
  useAddToCartMutation,
} from "../redux/api";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductQuery(id);

  const [addToCart, { isLoading: adding }] =
    useAddToCartMutation();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        Product not found
      </div>
    );
  }

  const handleAddToCart = async () => {

    try {

      await addToCart({
        userId: "user123",
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      }).unwrap();

      alert("Product added to cart!");

      navigate("/cart");

    } catch (error) {

      alert("Failed to add product");

    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow"
          />
        </div>

        <div>

          <p className="text-blue-600 font-semibold">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-green-600 mt-5">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-7">
            {product.description}
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="border px-6 py-3 rounded-lg"
            >
              Back
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
21. Cart Page

Create:

frontend/src/pages/Cart.jsx
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
} from "../redux/api";

function Cart() {

  const userId = "user123";

  const {
    data: cartItems,
    isLoading,
  } = useGetCartQuery(userId);

  const [deleteCartItem] =
    useDeleteCartItemMutation();

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading cart...
      </div>
    );
  }

  const total = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        My Cart
      </h1>

      {cartItems?.length === 0 && (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      )}

      <div className="space-y-4">

        {cartItems?.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-5 bg-white shadow p-4 rounded-lg"
          >

            <img
              src={item.image}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">

              <h2 className="font-bold text-lg">
                {item.productName}
              </h2>

              <p>
                ₹{item.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

            </div>

            <button
              onClick={() =>
                deleteCartItem(item._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      {cartItems?.length > 0 && (

        <div className="mt-8 text-right">

          <h2 className="text-2xl font-bold">
            Total: ₹{total}
          </h2>

          <button className="bg-green-600 text-white px-6 py-3 rounded mt-4">
            Checkout
          </button>

        </div>

      )}

    </div>
  );
}

export default Cart;
22. About Page

Create:

frontend/src/pages/About.jsx
function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-6">
        About ShopEasy
      </h1>

      <p className="text-gray-600 leading-8">
        ShopEasy is a simple e-commerce website
        built using MERN Stack. Users can view
        products, see product details and add
        products to their cart.
      </p>

    </div>
  );
}

export default About;
23. Contact Page

Create:

frontend/src/pages/Contact.jsx
import { useState } from "react";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("Message submitted!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-8">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="5"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;
24. Add Products to MongoDB

Backend run பண்ணிட்டு Postman-ல்:

POST
http://localhost:5000/api/products

Body → raw → JSON:

{
  "name": "iPhone 15",
  "price": 65000,
  "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
  "description": "Apple iPhone with powerful performance and great camera.",
  "category": "Electronics"
}

Another:

{
  "name": "Nike Shoes",
  "price": 4999,
  "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "description": "Comfortable and stylish running shoes.",
  "category": "Fashion"
}

Another:

{
  "name": "Smart Watch",
  "price": 2999,
  "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "description": "Smart watch with fitness tracking features.",
  "category": "Electronics"
}
25. Final Flow

இந்த project எப்படி work ஆகும் என்று simple-ஆ பார்த்தா:

                    FRONTEND
                       |
                       ↓
                  React App
                       |
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Navbar         Home           Footer
                       |
                       ↓
                RTK Query API
                       |
                       ↓
              GET /api/products
                       |
                       ↓
                    BACKEND
                       |
                       ↓
                   Express
                       |
                       ↓
                   MongoDB
