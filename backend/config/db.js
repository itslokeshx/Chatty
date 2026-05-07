import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_API);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log({ error: `Connection failed!` });
  }
};

export default connectDB;
