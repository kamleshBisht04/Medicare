import mongoose from "mongoose";

const DB = process.env.MONGODB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });
    await mongoose.connect(DB);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

export default connectDB;
