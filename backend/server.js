import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";

// api config
const app = express();
const port = process.env.PORT || 4000;

// Database Connection & Cloudinary Connection
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Test Rout
app.get("/", (req, res) => {
  res.send("API is working...");
});

app.listen(port, () => console.log(`server started at port no ${port}`));
