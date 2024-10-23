const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
const travelRoutes = require("./routes/travelRoutes");
const path = require('path');

const app = express();
app.use(cors());
connectDB();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/pages', 'index.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/pages', 'login.html'));
});
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/pages', 'signup.html'));
});


app.use(express.json());

app.use("/auth", authRoutes);

// The user routes are now accessible at /users
app.use('/users', userRoutes);

app.use('/travels', travelRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
