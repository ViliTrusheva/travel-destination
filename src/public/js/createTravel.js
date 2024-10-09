import { postTravel } from "../api/auth.js";
import { deleteTravel, getTravels } from "../api/travelsApi.js";
// import { getUser } from "../api/userApi.js";
import { formatDate, formatDateWithTime } from "./dateUtils.js";
const form = document.getElementById("create-form");
const deleteModal = document.getElementById("delete-modal");

// Add an event listener to handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const startDate = document.getElementById("date-from").value;
  const endDate = document.getElementById("date-to").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const image = "https://example.com/alps.jpg";

  const travelObj = {
    title: title,
    description: description,
    dateFrom: startDate,
    dateTo: endDate,
    location: { country: country, city: city },
    image: image,
    createdAt: new Date(),
  };
  postTravel(travelObj);
  document.getElementById("create-modal").classList.add("hidden");
  document.getElementById("create-modal").classList.remove("visible");
  populateTemplate(travelObj);
});

// Helper function to populate the travel template
export function populateTemplate(travel, user) {
  let temp = document.getElementById("travel-template");
  let clone = temp.content.cloneNode(true);

  clone.getElementById("title").textContent = travel.title;
  clone.getElementById("location").textContent = `${
    travel.location.city + ", " + travel.location.country
  }`;
  clone.getElementById("description").textContent = travel.description;
  clone.getElementById("date-from").textContent = formatDate(travel.dateFrom);
  clone.getElementById("date-to").textContent = formatDate(travel.dateTo);
  clone.getElementById(
    "created"
  ).textContent = `Posted on: ${formatDateWithTime(travel.createdAt)}`;
  clone.getElementById("username").textContent = user.nickname;
  const travelId = travel._id;

  // Check if the user is logged in to display the edit and delete buttons
  const token = localStorage.getItem("token");
  if (token) {
    clone.getElementById("edit").textContent = "Edit";
    clone.getElementById("delete").addEventListener("click", () => {
      deleteModal.classList.remove("hidden");
      deleteModal.classList.add("visible");

      // Add an event listener to handle the cancel button
      document.getElementById("cancel-delete").addEventListener("click", () => {
        deleteModal.classList.add("hidden");
        deleteModal.classList.remove("visible");
      });

      // Add an event listener to handle the confirm button
      document.getElementById("confirm-delete").addEventListener("click", async () => {
        console.log("Confirm button clicked", travelId);
        try {
          await deleteTravel(travelId);
          console.log("Travel deleted successfully");
          deleteModal.classList.add("hidden");
          deleteModal.classList.remove("visible");
        } catch (error) {
          console.error("Failed to delete travel:", error);
        }
      });
    });
  } else {
    clone.getElementById("edit").classList.add("hidden");
    clone.getElementById("delete").classList.add("hidden");
  }

  document.getElementById("output").appendChild(clone);
}
