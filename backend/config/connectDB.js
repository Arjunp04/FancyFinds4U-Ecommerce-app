import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("DB already connected");
      return;
    }

    // Listen for the first connection event only once
    mongoose.connection.once("connected", () => {
      console.log("DB Connected");
    });

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectToDB;
