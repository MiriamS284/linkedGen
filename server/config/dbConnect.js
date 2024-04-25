import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    //console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    //console.error("Connection to MongoDB failed:", error);
  }
};

export default connectDB;
