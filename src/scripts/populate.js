const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");
const User = require("../models/userModel");
const Travel = require("../models/travelModel");

// Function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const populateDB = async () => {
  try {
    await connectDB();

    // Clear existing data (optional)
    await User.deleteMany({});
    await Travel.deleteMany({});
    console.log("Previous data cleared!");

    // Create mock users with hashed passwords
    const users = await User.create([
      {
        nickname: "John Doe",
        email: "john@example.com",
        password: await hashPassword("password123"), // Hash the password
      },
      {
        nickname: "Jane Smith",
        email: "jane@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Bob Brown",
        email: "bob.brown@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Charlie Green",
        email: "charlie.green@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Daisy Miller",
        email: "daisy.miller@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Edward King",
        email: "edward.king@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Fiona White",
        email: "fiona.white@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "George Black",
        email: "george.black@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Hannah Gray",
        email: "hannah.gray@example.com",
        password: await hashPassword("password123"),
      },
      {
        nickname: "Ian Blue",
        email: "ian.blue@example.com",
        password: await hashPassword("password123"),
      },
    ]);

    console.log("Mock users created");

    // Create mock travel posts
    // Create mock travel posts for each user
    const travels = await Travel.create([
      // Travels for John Doe
      {
        title: "Hiking in Denali",
        description:
          "An incredible hiking adventure in Denali National Park. Experience the breathtaking views of the majestic mountains and lush valleys. Enjoy the diverse wildlife and pristine nature as you explore the trails.",
        dateFrom: new Date("2024-02-10"),
        dateTo: new Date("2024-02-20"),
        location: {
          country: "USA",
          city: "Denali National Park",
          address: "Denali Park Road",
        },
        image: "denali.jpg",
        user: users[0]._id,
      },
      {
        title: "Exploring the Alaskan Wilderness",
        description:
          "A thrilling experience exploring the untouched wilderness of Alaska. Discover hidden gems off the beaten path, and embrace the serenity of nature. This trip offers a perfect blend of adventure and relaxation.",
        dateFrom: new Date("2024-03-15"),
        dateTo: new Date("2024-03-25"),
        location: {
          country: "USA",
          city: "Anchorage",
          address: "Anchorage Museum",
        },
        image: "example.jpg",
        user: users[0]._id,
      },

      // Travels for Jane Smith
      {
        title: "Road Trip Along the Pacific Coast",
        description:
          "A scenic road trip along the beautiful Pacific Coast Highway. Enjoy stunning ocean views, charming coastal towns, and majestic cliffs. This journey is perfect for anyone seeking adventure and scenic beauty. A scenic road trip along the beautiful Pacific Coast Highway. Enjoy stunning ocean views, charming coastal towns, and majestic cliffs. This journey is perfect for anyone seeking adventure and scenic beauty.",

        dateFrom: new Date("2024-04-05"),
        dateTo: new Date("2024-04-15"),
        location: {
          country: "USA",
          city: "California",
          address: "Pacific Coast Highway",
        },
        image: "denali.jpg",
        user: users[1]._id,
      },
      {
        title: "Wine Tasting in Napa Valley",
        description:
          "Enjoying exquisite wines and breathtaking vineyards in Napa Valley.",
        dateFrom: new Date("2024-05-10"),
        dateTo: new Date("2024-05-20"),
        location: {
          country: "USA",
          city: "Napa",
          address: "Napa Valley",
        },
        image: "example.jpg",
        user: users[1]._id,
      },

      // Travels for Alice Johnson
      {
        title: "Safari in Kenya",
        description:
          "An unforgettable safari experience in the heart of Kenya.",
        dateFrom: new Date("2024-06-01"),
        dateTo: new Date("2024-06-15"),
        location: {
          country: "Kenya",
          city: "Masai Mara",
          address: "Masai Mara National Reserve",
        },
        image: "denali.jpg",
        user: users[2]._id,
      },
      {
        title: "Cultural Exploration in Tokyo",
        description: "Discovering the vibrant culture and cuisine of Tokyo.",
        dateFrom: new Date("2024-07-01"),
        dateTo: new Date("2024-07-10"),
        location: {
          country: "Japan",
          city: "Tokyo",
          address: "Shibuya Crossing",
        },
        image: "example.jpg",
        user: users[2]._id,
      },

      // Travels for Bob Brown
      {
        title: "Adventure in New Zealand",
        description:
          "Experiencing the breathtaking landscapes and adventures of New Zealand.",
        dateFrom: new Date("2024-08-01"),
        dateTo: new Date("2024-08-15"),
        location: {
          country: "New Zealand",
          city: "Queenstown",
          address: "Queenstown Lake",
        },
        image: "denali.jpg",
        user: users[3]._id,
      },
      {
        title: "Historical Tour of Rome",
        description: "Exploring the ancient ruins and rich history of Rome.",
        dateFrom: new Date("2024-09-05"),
        dateTo: new Date("2024-09-15"),
        location: {
          country: "Italy",
          city: "Rome",
          address: "Colosseum",
        },
        image: "example.jpg",
        user: users[3]._id,
      },

      // Travels for Charlie Green
      {
        title: "Beach Time in Maldives",
        description: "Relaxing on the pristine beaches of the Maldives.",
        dateFrom: new Date("2024-10-01"),
        dateTo: new Date("2024-10-10"),
        location: {
          country: "Maldives",
          city: "Malé",
          address: "Baa Atoll",
        },
        image: "denali.jpg",
        user: users[4]._id,
      },
      {
        title: "Exploring the Great Wall of China",
        description: "A journey along the magnificent Great Wall of China. Walk along this architectural marvel and enjoy panoramic views of the surrounding landscapes. Learn about the history and significance of this UNESCO World Heritage site. A journey along the magnificent Great Wall of China. Walk along this architectural marvel and enjoy panoramic views of the surrounding landscapes. Learn about the history and significance of this UNESCO World Heritage site. A journey along the magnificent Great Wall of China. Walk along this architectural marvel and enjoy panoramic views of the surrounding landscapes. Learn about the history and significance of this UNESCO World Heritage site. A journey along the magnificent Great Wall of China. Walk along this architectural marvel and enjoy panoramic views of the surrounding landscapes. Learn about the history and significance of this UNESCO World Heritage site.",
        dateFrom: new Date("2024-11-15"),
        dateTo: new Date("2024-11-25"),
        location: {
          country: "China",
          city: "Beijing",
          address: "Great Wall of China",
        },
        image: "example.jpg",
        user: users[4]._id,
      },

      // Travels for Daisy Miller
      {
        title: "Trekking in the Andes",
        description: "A thrilling trek through the majestic Andes mountains.",
        dateFrom: new Date("2024-12-01"),
        dateTo: new Date("2024-12-10"),
        location: {
          country: "Peru",
          city: "Cusco",
          address: "Machu Picchu",
        },
        image: "denali.jpg",
        user: users[5]._id,
      },
      {
        title: "City Tour in Paris",
        description:
          "Exploring the romantic streets and iconic landmarks of Paris.",
        dateFrom: new Date("2025-01-05"),
        dateTo: new Date("2025-01-15"),
        location: {
          country: "France",
          city: "Paris",
          address: "Eiffel Tower",
        },
        image: "example.jpg",
        user: users[5]._id,
      },

      // Travels for Edward King
      {
        title: "Wilderness Camping in Canada",
        description:
          "Camping under the stars in the beautiful Canadian wilderness.",
        dateFrom: new Date("2025-02-20"),
        dateTo: new Date("2025-03-01"),
        location: {
          country: "Canada",
          city: "Banff",
          address: "Banff National Park",
        },
        image: "denali.jpg",
        user: users[6]._id,
      },
      {
        title: "Culinary Tour in Thailand",
        description: "Indulging in the delicious street food of Thailand. Discover local markets and try a variety of traditional dishes. This journey will tantalize your taste buds and immerse you in the vibrant culture of Thailand. Indulging in the delicious street food of Thailand. Discover local markets and try a variety of traditional dishes. This journey will tantalize your taste buds and immerse you in the vibrant culture of Thailand. Indulging in the delicious street food of Thailand. Discover local markets and try a variety of traditional dishes. This journey will tantalize your taste buds and immerse you in the vibrant culture of Thailand.",
        dateFrom: new Date("2025-04-10"),
        dateTo: new Date("2025-04-20"),
        location: {
          country: "Thailand",
          city: "Bangkok",
          address: "Chatuchak Market",
        },
        image: "example.jpg",
        user: users[6]._id,
      },

      // Travels for Fiona White
      {
        title: "Historical Exploration in Athens",
        description: "Discovering the ancient ruins and history of Athens.",
        dateFrom: new Date("2025-05-01"),
        dateTo: new Date("2025-05-10"),
        location: {
          country: "Greece",
          city: "Athens",
          address: "Acropolis",
        },
        image: "denali.jpg",
        user: users[7]._id,
      },
      {
        title: "Island Hopping in Greece",
        description: "Discovering the ancient ruins and history of Athens. Visit the Acropolis and immerse yourself in the rich cultural heritage. Enjoy the vibrant atmosphere of the city with its bustling streets and local tavernas.",
        dateFrom: new Date("2025-06-15"),
        dateTo: new Date("2025-06-25"),
        location: {
          country: "Greece",
          city: "Santorini",
          address: "Oia",
        },
        image: "example.jpg",
        user: users[7]._id,
      },

      // Travels for George Black
      {
        title: "Caving in Vietnam",
        description: "Exploring the stunning caves of Phong Nha.",
        dateFrom: new Date("2025-07-05"),
        dateTo: new Date("2025-07-15"),
        location: {
          country: "Vietnam",
          city: "Phong Nha",
          address: "Phong Nha-Kẻ Bàng National Park",
        },
        image: "denali.jpg",
        user: users[8]._id,
      },
    ]);

    console.log("Travel posts created");

    mongoose.connection.close();
    console.log("Database populated successfully!");
  } catch (error) {
    console.error("Error populating database:", error);
    mongoose.connection.close();
  }
};

populateDB();
