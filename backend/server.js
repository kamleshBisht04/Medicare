import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from './configs/cloudinary.js';


// api config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewers
app.use(express.json());
app.use(cors());

// api endPoints
app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(port, () => console.log(`Server started ${port}`));
