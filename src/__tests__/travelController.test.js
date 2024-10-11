// Import necessary modules
const { getTravels } = require("../controllers/travelController");
const Travel = require("../models/travelModel");

// Mock the Travel model
jest.mock("../models/travelModel");

describe("Travel Controller - getTravels", () => {
  it("should return all travels with status 200", async () => {
    // Mock data
    const mockTravels = [
      { title: "Trip to Paris", description: "A wonderful trip to Paris" },
      { title: "Hiking in the Alps", description: "Adventurous hiking trip" },
    ];

    // Mock the Travel.find method to return the mock data
    Travel.find.mockResolvedValue(mockTravels);

    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getTravels(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      count: mockTravels.length,
      data: mockTravels,
    });
  });

  it("should return a 500 status on server error", async () => {
    // Mock the Travel.find method to throw an error
    Travel.find.mockRejectedValue(new Error("Database error"));

    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getTravels(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Server error, unable to fetch travels",
    });
  });
});
