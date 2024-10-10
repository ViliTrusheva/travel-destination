import { putTravel } from "../api/travelsApi.js";
import { reFormatDate } from "./dateUtils.js";
import Travel from "../entities/Travel.js";

// Get the edit modal elements
const editModal = document.getElementById("edit-modal");

// Show the edit modal and populate it with travel data
export function showEditModal(travel) {
  editModal.classList.remove("hidden");
  editModal.classList.add("visible");

  document.getElementById("edit-title").value = travel.title;
  document.getElementById("edit-country").value = travel.location.country;
  document.getElementById("edit-city").value = travel.location.city;
  document.getElementById("edit-description").value = travel.description;
  document.getElementById("edit-date-from").value = reFormatDate(travel.dateFrom);
  document.getElementById("edit-date-to").value = reFormatDate(travel.dateTo);

  // Handle cancel edit action
  document.getElementById("cancel-edit").addEventListener("click", hideEditModal);

  // Handle confirm edit action
  document.getElementById("confirm-edit").addEventListener("click", async () => {
    try {
      const updatedTravel = new Travel(
        document.getElementById("edit-title").value,
        document.getElementById("edit-description").value,
        document.getElementById("edit-date-from").value,
        document.getElementById("edit-date-to").value,
        document.getElementById("edit-country").value,
        document.getElementById("edit-city").value,
        "https://example.com/alps.jpg" // This could be dynamic if needed
      );

      await putTravel(travel._id, updatedTravel);
      console.log("Travel updated successfully");
      hideEditModal();
    } catch (error) {
      console.error("Failed to update travel:", error);
    }
  });
}

// Hide the edit modal
export function hideEditModal() {
  editModal.classList.add("hidden");
  editModal.classList.remove("visible");
}
