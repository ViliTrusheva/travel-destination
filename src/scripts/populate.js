const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/userModel");
const Travel = require("../models/travelModel");

const populateDB = async () => {
  try {
    await connectDB();

    // Clear existing data (optional)
    await User.deleteMany({});
    await Travel.deleteMany({});
    console.log("Previous data cleared!");

    // Create mock users
    const users = await User.create([
      {
        nickname: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        nickname: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
      },
    ]);

    console.log("mock user created");

    // Create mock travel posts
    const travels = await Travel.create([
      {
        title: "Hiking in the Alps",
        description: "A great experience hiking through the Swiss Alps.",
        dateFrom: new Date("2023-09-10"),
        dateTo: new Date("2023-09-20"),
        location: {
          country: "Switzerland",
          city: "Zermatt",
          address: "Matterhorn Mountain",
        },
        image: "https://example.com/alps.jpg",
        user: users[0]._id,
      },
      {
        title: "Beach Vacation in Bali",
        description: "Relaxing by the beach and enjoying the sun.",
        dateFrom: new Date("2024-01-15"),
        dateTo: new Date("2024-01-30"),
        location: {
          country: "Indonesia",
          city: "Kuta",
          address: "Kuta Beach",
        },
        image: "https://example.com/bali.jpg",
        user: users[1]._id,
      },
    ]);

    mongoose.connection.close();
    console.log("Database populated successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
    mongoose.connection.close();
  }
};

populateDB();
