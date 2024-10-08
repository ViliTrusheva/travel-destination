const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
const travelRoutes = require("./routes/travelRoutes");

const app = express();
connectDB();
app.use(express.json());

app.use("/auth", authRoutes);

// The user routes are now accessible at /users
app.use('/users', userRoutes);

app.use('/travels', travelRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
