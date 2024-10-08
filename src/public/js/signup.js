import { registerUser } from "../api/auth.js";

// ******************* Signup Form Validation ******************* //

const form = document.getElementById("signup-form");

// Constants for error messages
const ERROR_MESSAGES = {
  invalidEmail: "Invalid email address",
  usernameTooShort: "Username must be at least 4 characters long",
  usernameTooLong: "Username must be under 30 characters long",
  passwordTooShort: "Password must be at least 8 characters long",
  passwordsDoNotMatch: "Passwords do not match",
};

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

  const newPassword = document.getElementById("password").value;
  const newRepeatedPassword =
    document.getElementById("repeated-password").value;
  const newUser = document.getElementById("username").value;
  const newEmail = document.getElementById("email").value;

  let hasError = false;

  const showError = (elementId, message) => {
    const errorElement = document.getElementById(`${elementId}-error-message`); 
    const inputElement = document.getElementById(elementId);
    // Set the error message
    errorElement.textContent = message;
    // Add error class to the input element
    inputElement.classList.add("input-error");
  };

  // Validate email
  if (!validateEmail(newEmail)) {
    showError("email", ERROR_MESSAGES.invalidEmail);
    hasError = true;
  }

  // Validate username
  if (!validateUsername(newUser)) {
    if (newUser.length < 4) {
      showError("username", ERROR_MESSAGES.usernameTooShort);
    } else {
      showError("username", ERROR_MESSAGES.usernameTooLong);
    }
    hasError = true;
  }

  // Validate passwords
  if (!validatePasswords(newPassword, newRepeatedPassword)) {
    if (newPassword.length < 8) {
      showError("password", ERROR_MESSAGES.passwordTooShort);
    } else {
      showError("repeated-password", ERROR_MESSAGES.passwordsDoNotMatch);
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
      alert("Form submitted successfully!");
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
