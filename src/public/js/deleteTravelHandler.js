import { deleteTravel } from "../api/travelsApi.js";

// Get the delete modal elements
const deleteModal = document.getElementById("delete-modal");

// Show the delete modal
export function showDeleteModal(travelId) {
  deleteModal.classList.remove("hidden");
  deleteModal.classList.add("visible");

  // Cancel delete modal
  document.getElementById("cancel-delete").addEventListener("click", hideDeleteModal);

  // Confirm delete action
  document.getElementById("confirm-delete").addEventListener("click", async () => {
    try {
      await deleteTravel(travelId);
      console.log("Travel deleted successfully");
      hideDeleteModal();
    } catch (error) {
      console.error("Failed to delete travel:", error);
    }
  });
}

// Hide the delete modal
export function hideDeleteModal() {
  deleteModal.classList.add("hidden");
  deleteModal.classList.remove("visible");
}
