import mongoose from "mongoose";

const DB = process.env.MONGODB_URI.replace("<PASSWORD>", process.env.MONGODB_PASSWORD);

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected !");
    });
    await mongoose.connect(DB);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
