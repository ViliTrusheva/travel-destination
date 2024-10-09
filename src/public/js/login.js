import { loginUser } from "../api/auth.js";

const form = document.getElementById("login-form");

// Add an event listener to handle form submission
form.addEventListener("submit", async (event) => {
  localStorage.removeItem("token"); // Remove any existing tokens from local storage
  event.preventDefault(); // Prevent the default form submission behavior

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Reset error messages and classes
  document.getElementById("email-error-message").textContent = "";
  document.getElementById("email").classList.remove("input-error");
  document.getElementById("password-error-message").textContent = "";
  document.getElementById("password").classList.remove("input-error");

  try {
    const response = await loginUser(email, password); // Send login request
    const data = await response.json(); // Parse the JSON response
    console.log(data);

    if (response.ok) {
      alert("User logged in successfully!"); // Show success message if login is successful
      localStorage.setItem("token", data.token); // Store the token in local storage
      const username = data.user.nickname;
      localStorage.setItem("username", username);
    } else if (data.message === "Invalid password.") {
      document.getElementById("password-error-message").textContent =
        "Invalid password, try again."; // Show password error message
      document.getElementById("password").classList.add("input-error"); // Add error class to password input
    } else if (data.message === "Invalid email") {
      document.getElementById("email-error-message").textContent =
        "Invalid email, try again."; // Show email error message
      document.getElementById("email").classList.add("input-error"); // Add error class to email input
    } else {
      throw new Error(data.message); // Throw an error for any other messages
    }
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
  }
});
