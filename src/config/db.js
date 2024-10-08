const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect("mongodb://127.0.0.1:27017");
    console.log(`MongoDB connected: ${dbConnection.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
