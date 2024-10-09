import { deleteTravel, putTravel } from "../api/travelsApi.js";
import Travel from "../entities/Travel.js";
import { reFormatDate } from "./dateUtils.js";

const deleteModal = document.getElementById("delete-modal");
const editModal = document.getElementById("edit-modal");

export function showDeleteModal(travelId) {
  deleteModal.classList.remove("hidden");
  deleteModal.classList.add("visible");

  document.getElementById("cancel-delete").addEventListener("click", () => {
    deleteModal.classList.add("hidden");
    deleteModal.classList.remove("visible");
  });

  document.getElementById("confirm-delete").addEventListener("click", async () => {
    try {
      await deleteTravel(travelId);
      deleteModal.classList.add("hidden");
      deleteModal.classList.remove("visible");
    } catch (error) {
      console.error("Failed to delete travel:", error);
    }
  });
}

export function showEditModal(travel) {
  editModal.classList.remove("hidden");
  editModal.classList.add("visible");

  document.getElementById("edit-title").value = travel.title;
  document.getElementById("edit-country").value = travel.location.country;
  document.getElementById("edit-city").value = travel.location.city;
  document.getElementById("edit-description").value = travel.description;
  document.getElementById("edit-date-from").value = reFormatDate(travel.dateFrom);
  document.getElementById("edit-date-to").value = reFormatDate(travel.dateTo);

  document.getElementById("cancel-edit").addEventListener("click", () => {
    editModal.classList.add("hidden");
    editModal.classList.remove("visible");
  });

  document.getElementById("confirm-edit").addEventListener("click", async () => {
    const editTitle = document.getElementById("edit-title").value;
    const editCountry = document.getElementById("edit-country").value;
    const editCity = document.getElementById("edit-city").value;
    const editDescription = document.getElementById("edit-description").value;
    const editDateFrom = document.getElementById("edit-date-from").value;
    const editDateTo = document.getElementById("edit-date-to").value;
    const image = "https://example.com/alps.jpg";

    const editTravelObj = new Travel(editTitle, editDescription, editDateFrom, editDateTo, editCountry, editCity, image);

    try {
      await putTravel(travel._id, editTravelObj);
    } catch (error) {
      console.error("Failed to update travel:", error);
    }
  });
}