import mongoose from "mongoose";

const DB = process.env.MONGODB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed : ", error.message);
    process.exit(1);
  }
};

export default connectDB;
