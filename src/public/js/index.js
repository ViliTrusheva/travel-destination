// Get references from the DOM
const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modalElement = document.getElementById("create-modal");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const usernameDisplay = document.getElementById("username-display");

// Add event listener for the logout button
logoutBtn.addEventListener("click", () => {
  // Remove the token from local storage
  localStorage.removeItem("token");
  // update the UI based on the user's login status
  isUserLoggedIn();
});

// Add event listener for the create button
createBtn.addEventListener("click", () => {
  if (modalElement) {
    // Show the modal
    modalElement.classList.remove("hidden");
    modalElement.classList.add("visible");
  }
});

// Add event listener for the cancel button
cancelBtn.addEventListener("click", () => {
  if (modalElement) {
    // Hide the modal
    modalElement.classList.remove("visible");
    modalElement.classList.add("hidden");
  }
});

// Check if the user is logged in
const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  console.log("Token", token);
  if (!token) {
    // Hide the user buttons
    hideUserButtons()
  } else {
    // Show the user buttons
    showUserButtons(username);
  }
};

// Hide or show user buttons based on the user's login status
const hideUserButtons = () => {
  const editButtons = document.querySelectorAll("#edit");
  const deleteButtons = document.querySelectorAll("#delete");
  editButtons.forEach(button => button.classList.add("hidden"));
  deleteButtons.forEach(button => button.classList.add("hidden"));
  createBtn.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  signupBtn.classList.remove("hidden");
  loginBtn.classList.remove("hidden");
  usernameDisplay.textContent = ""; 
};

const showUserButtons = (username) => {
  const editButtons = document.querySelectorAll("#edit");
  const deleteButtons = document.querySelectorAll("#delete");
  editButtons.forEach(button => button.classList.remove("hidden"));
  deleteButtons.forEach(button => button.classList.remove("hidden"));
  createBtn.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  signupBtn.classList.add("hidden");
  loginBtn.classList.add("hidden");
  usernameDisplay.textContent = `Hi ${username}!`;
};

// Add an event listener to check if the user is logged in
window.addEventListener("load", () => {
  isUserLoggedIn();
});
