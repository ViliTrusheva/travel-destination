// Get references from the DOM
const createBtn = document.getElementById("create-btn");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const usernameDisplay = document.getElementById("username-display");
const editButton = document.querySelectorAll("#edit");
const deleteButton = document.querySelectorAll("#delete");
import { getTravels } from "../api/travelsApi.js";
import { getUser } from "../api/userApi.js";
import { populateTemplate } from "./populateTemplate.js";
import { showCreateModal, hideCreateModal } from "./createTravelHandler.js";
import { createTravelHandler } from "./createTravelHandler.js";

// Add event listener for the logout button
logoutBtn.addEventListener("click", () => {
  // Remove the token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  // update the UI based on the user's login status
  isUserLoggedIn();
});

// Check if the user is logged in
const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token) {
    // Hide the user buttons
    hideUserButtons();
  } else {
    // Show the user buttons
    showUserButtons(username);
  }
};

// Hide or show user buttons based on the user's login status
const hideUserButtons = () => {
  editButton.forEach((button) => button.classList.add("hidden"));
  deleteButton.forEach((button) => button.classList.add("hidden"));
  createBtn.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  signupBtn.classList.remove("hidden");
  loginBtn.classList.remove("hidden");
  usernameDisplay.textContent = "";
};

const showUserButtons = (username) => {
  editButton.forEach((button) => button.classList.remove("hidden"));
  deleteButton.forEach((button) => button.classList.remove("hidden"));
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

async function loadTravels() {
  const travels = await getTravels();
  const users = await getUser();

  // Mapping of user IDs to user objects
  const userMap = {};
  users.forEach((user) => {
    userMap[user._id] = user;
  });

  travels.forEach((travel) => {
    const user = userMap[travel.user];
    populateTemplate(travel, user);
  });
}

loadTravels();

const user = localStorage.getItem("username");

// Set up event listeners
document
  .getElementById("create-btn")
  .addEventListener("click", () => showCreateModal());
document
  .getElementById("cancel-btn")
  .addEventListener("click", () => hideCreateModal());
document
  .getElementById("create-form")
  .addEventListener("submit", (event) => createTravelHandler(event, user));
