import { formatDate, formatDateWithTime} from "./dateUtils.js";
import { showDeleteModal } from "./deleteTravelHandler.js";
import { showEditModal } from "./editTravelHandler.js";

// Function to populate the travel template with data
export function populateTemplate(travel, user) {
  const temp = document.getElementById("travel-template");
  const clone = temp.content.cloneNode(true);

  clone.getElementById("title").textContent = travel.title;
  clone.getElementById("location").textContent = `${travel.location.city}, ${travel.location.country}`;
  clone.getElementById("description").textContent = travel.description;
  clone.getElementById("date-from").textContent = formatDate(travel.dateFrom);
  clone.getElementById("date-to").textContent = formatDate(travel.dateTo);
  clone.getElementById("created").textContent = `Posted on: ${formatDateWithTime(travel.createdAt)}`;
  clone.getElementById("username").textContent = user.nickname;

  const travelId = travel._id;

  // Check if user is logged in to show edit and delete buttons
  const token = localStorage.getItem("token");
  if (token) {
    clone.getElementById("edit").textContent = "Edit";
    // Event listeners for delete and edit modals
    clone.getElementById("delete").addEventListener("click", () => showDeleteModal(travelId));
    clone.getElementById("edit").addEventListener("click", () => showEditModal(travel));
  } else {
    clone.getElementById("edit").classList.add("hidden");
    clone.getElementById("delete").classList.add("hidden");
  }

  document.getElementById("output").appendChild(clone);
}
