const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable JSON parsing (Fixes `req.body` being undefined)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handles form data too

// ✅ CORS Configuration
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5177",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5177",
        "http://localhost:5180",
        "http://localhost:5181",
        "http://localhost:5182",
        "http://localhost:5183",
        "http://localhost:5184",
        "http://localhost:5185",
        "http://localhost:5186",
        "http://localhost:5187",

    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Handle Preflight Requests (CORS)
app.options("*", cors());

// ✅ Define Routes
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/vendor-cart", require("./routes/vendorCartRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));

// ✅ Serve Static Images
app.use("/images", express.static(path.join(__dirname, "public/images")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
