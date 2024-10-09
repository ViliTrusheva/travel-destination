import { registerUser } from "../api/auth.js";
import { loginUser } from "../api/auth.js";
import { showError, clearErrors } from "./errorHandling.js";

// Clear previous error messages
clearErrors("email");
clearErrors("password");

// ******************* Signup Form Validation ******************* //

const form = document.getElementById("signup-form");

// Helper function to validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate username
const validateUsername = (username) => {
  return username.length >= 4 && username.length <= 30;
};

// Helper function to validate passwords
const validatePasswords = (password, repeatedPassword) => {
  return password.length >= 8 && password === repeatedPassword;
};

// Event listener for the form to handle submit
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  const newPassword = document.getElementById("password").value;
  const newRepeatedPassword =
    document.getElementById("repeated-password").value;
  const newUser = document.getElementById("username").value;
  const newEmail = document.getElementById("email").value;

  let hasError = false;

  // Validate email
  if (!validateEmail(newEmail)) {
    showError("email", "Invalid email address");
    hasError = true;
  }

  // Validate username
  if (!validateUsername(newUser)) {
    if (newUser.length < 4) {
      showError("username", "Username must be at least 4 characters long");
    } else {
      showError("username", "Username must be under 30 characters long");
    }
    hasError = true;
  }

  // Validate passwords
  if (!validatePasswords(newPassword, newRepeatedPassword)) {
    if (newPassword.length < 8) {
      showError("password", "Password must be at least 8 characters long");
    } else {
      showError("repeated-password", "Passwords do not match");
    }
    hasError = true;
  }

  // If there are any errors, prevent form submission
  if (hasError) {
    return;
  }

  // If all conditions are met, proceed with user registration
  try {
    const response = await registerUser(newUser, newEmail, newPassword);
    const data = await response.json();
    if (response.ok) {
      alert("Welcome to Travel Destinations!");
      const loginResponse = await loginUser(newEmail, newPassword);
      const data = await loginResponse.json();
      localStorage.setItem("username", newUser);
      localStorage.setItem("token", data.token);
      window.location.href = "../pages/index.html"; // Redirect to home page
    } else {
      //if the user already exists, display an alert
      if (data.message === "User already exists.") {
        alert("User already exists, login instead.");
      } else {
        throw new Error(data.message);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
