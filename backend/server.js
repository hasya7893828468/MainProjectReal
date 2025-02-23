const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");


dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cards", require("./routes/cardRoutes")); // Add this line

// app.get("/api/cards", (req, res) => {
//     const cards = [
//       {
//         name: "Red Tape",
//         img: "/images/img1.jpg", // Relative path
//         price: 1123,
//         Dprice: 5899,
//         Off: "80% OFF",
//       },
//       {
//         name: "Green Tape",
//         img: "/images/Screenshot 2024-11-30 134051.png",
//         price: 1123,
//         Dprice: 5899,
//         Off: "80% OFF",
//       },
//     ];
//     res.json(cards);
//   });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const cors = require("cors");
// app.use(cors({ origin: "*" }));
