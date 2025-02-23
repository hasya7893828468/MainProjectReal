const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Card = require("./models/Card");

dotenv.config();
connectDB();

const cards = [
  {
    name: "Red Tape",
    img: "/images/img1.jpg", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "20% OFF",
  },
  {
    name: "Green Tape",
    img: "/images/Screenshot 2024-11-30 134051.png", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Walking Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "80% OFF",
  },
  {
    name: "Red Tape",
    img: "/images/img1.jpg", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "20% OFF",
  },
  {
    name: "Green Tape",
    img: "/images/Screenshot 2024-11-30 134051.png", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Walking Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "80% OFF",
  },{
    name: "Red Tape",
    img: "/images/img1.jpg", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "20% OFF",
  },
  {
    name: "Green Tape",
    img: "/images/Screenshot 2024-11-30 134051.png", // ✅ Corrected image path
    rating: 4.4,
    likes: "1.3k",
    description: "Men's Walking Shoes",
    price: 1123,
    Dprice: 5899,
    Off: "80% OFF",
  },
];

const importData = async () => {
  try {
    await Card.deleteMany(); // ✅ Delete existing data to prevent duplication
    await Card.insertMany(cards);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

importData();
