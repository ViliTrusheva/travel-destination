// Import necessary modules
const { registerUser } = require("../controllers/authController");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Mock the User model and bcrypt
jest.mock("../models/userModel");
jest.mock("bcrypt");

describe("Auth Controller - registerUser", () => {
  it("should return 400 if required fields are missing", async () => {
    // Mock request and response objects
    const req = { body: { email: "test@example.com" } }; // Missing nickname and password
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please provide all required fields.",
    });
  });

  it("should return 400 if the user already exists", async () => {
    // Mock request and response objects
    const req = {
      body: {
        nickname: "John",
        email: "john@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return an existing user
    User.findOne.mockResolvedValue({ email: "john@example.com" });

    // Call the controller function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists." });
  });

  it("should return 201 if the user is successfully created", async () => {
    // Mock request and response objects
    const req = {
      body: {
        nickname: "John",
        email: "john@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null (user does not exist)
    User.findOne.mockResolvedValue(null);

    // Mock bcrypt hashing
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock User.save to return the saved user
    User.prototype.save = jest.fn().mockResolvedValue({
      _id: "userId",
      nickname: "John",
      email: "john@example.com",
    });

    // Call the controller function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully!",
      user: { _id: "userId", nickname: "John", email: "john@example.com" },
    });
  });

  it("should return 500 on server error", async () => {
    // Mock request and response objects
    const req = {
      body: {
        nickname: "John",
        email: "john@example.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error("Database error"));

    // Call the controller function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
      error: "Database error",
    });
  });
});
