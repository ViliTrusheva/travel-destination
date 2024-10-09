// import { del } from "express/lib/application";

const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modalElement = document.getElementById("create-modal");

createBtn.addEventListener("click", () => {
  if (modalElement) {
    console.log("Create button clicked");
    modalElement.classList.remove("hidden");
    modalElement.classList.add("visible");
  }
});

cancelBtn.addEventListener("click", () => {
  if (modalElement) {
    console.log("Cancel button clicked");
    modalElement.classList.remove("visible");
    modalElement.classList.add("hidden");
  }
});

const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  console.log("Token", token);
  const createTravelBtn = document.getElementById("create-btn");
  if (!token) {
    createTravelBtn.classList.add("hidden");
  } else {
    createTravelBtn.classList.remove("hidden");
  }
};

// isUserLoggedIn();

// document.addEventListener("DOMContentLoaded", () => {
//   isUserLoggedIn();
// });

window.addEventListener("load", () => {
  isUserLoggedIn();
});
