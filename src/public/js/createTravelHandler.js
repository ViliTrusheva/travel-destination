// createTravelHandler.js

import { postTravel } from "../api/travelsApi.js";
import { showError, clearErrors } from "./errorHandling.js"; 
import Travel from "../entities/Travel.js"; 

const createModal = document.getElementById("create-modal");

// Show the create modal
export function showCreateModal() {
  createModal.classList.remove("hidden");
  createModal.classList.add("visible");
}

// Hide the create modal
export function hideCreateModal() {
  createModal.classList.add("hidden");
  createModal.classList.remove("visible");
}

// Travel creation logic
export async function createTravelHandler(user) {
//   // Clear previous error messages
//   clearErrors("title");
//   clearErrors("description");
//   clearErrors("date-from");
//   clearErrors("date-to");
//   clearErrors("country");
//   clearErrors("city");

  // Get form values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const startDate = document.getElementById("date-from").value;
  const endDate = document.getElementById("date-to").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const image = "https://example.com/alps.jpg"; // Placeholder image

//   // Form validation (you can add more validation if needed)
//   let hasError = false;
//   if (!title) {
//     showError("title", "Title is required.");
//     hasError = true;
//   }
//   if (!description) {
//     showError("description", "Description is required.");
//     hasError = true;
//   }
//   if (!startDate) {
//     showError("date-from", "Start date is required.");
//     hasError = true;
//   }
//   if (!endDate) {
//     showError("date-to", "End date is required.");
//     hasError = true;
//   }
//   if (!country) {
//     showError("country", "Country is required.");
//     hasError = true;
//   }
//   if (!city) {
//     showError("city", "City is required.");
//     hasError = true;
//   }

//   // Stop execution if there are errors
//   if (hasError) {
//     return;
//   }

  // Create the travel object
  const travelObj = new Travel(title, description, startDate, endDate, country, city, image, user.nickname);

  try {
    await postTravel(travelObj);
    console.log("Travel created successfully");
    hideCreateModal(); // Close the modal
  } catch (error) {
    console.error("Failed to create travel:", error);
  }
}
