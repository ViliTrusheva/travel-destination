import { loginUser } from "../api/auth.js";
import { showError, clearErrors } from "./errorHandling.js";

const form = document.getElementById("login-form");
// Clear previous error messages
clearErrors("email");
clearErrors("password");

// Add an event listener to handle form submission
form.addEventListener("submit", async (event) => {
  localStorage.removeItem("token"); // Remove any existing tokens from local storage
  event.preventDefault(); // Prevent the default form submission behavior

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await loginUser(email, password); // Send login request
    const data = await response.json(); // Parse the JSON response
    console.log(data);

    if (response.ok) {
      alert("User logged in successfully!"); // Show success message if login is successful
      localStorage.setItem("token", data.token); // Store the token in local storage
      const username = data.user.nickname;
      localStorage.setItem("username", username);
      window.location.href = "../pages/index.html"; // Redirect to home page
    } else if (data.message === "Invalid email or password.") {
      showError("password", "Invalid email or password, try again.");
      showError("email", "");
    } else {
      throw new Error(data.message); // Throw an error for any other messages
    }
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
  }
});
