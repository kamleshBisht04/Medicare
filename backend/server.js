import express from "express";
import cors from "cors";
import "dotenv/config";

// api config
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Rout
app.get("/", (req, res) => {
  res.send("API IS WORKING..");
});

app.listen(port, () => console.log(`server started at port no ${port}`));
