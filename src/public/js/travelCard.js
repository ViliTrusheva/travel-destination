import { formatDate, formatDateWithTime, reFormatDate } from "./dateUtils.js";
import { deleteTravel, putTravel } from "../api/travelsApi.js";
import Travel from "../entities/Travel.js";
const deleteModal = document.getElementById("delete-modal");
const editModal = document.getElementById("edit-modal");


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
  // console.log(travel);
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
      document
        .getElementById("confirm-delete")
        .addEventListener("click", async () => {
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
  clone.getElementById("edit").addEventListener("click", () => {
    console.log("Edit button clicked");
    editModal.classList.remove("hidden");
    editModal.classList.add("visible");
    document.getElementById("edit-title").value = travel.title;
    document.getElementById("edit-country").value = travel.location.country;
    document.getElementById("edit-city").value = travel.location.city;
    document.getElementById("edit-description").value = travel.description;
    document.getElementById("edit-date-from").value = reFormatDate(
      travel.dateFrom
    );
    document.getElementById("edit-date-to").value = reFormatDate(travel.dateTo);


    // Add an event listener to handle the edit button
    document.getElementById("cancel-edit").addEventListener("click", () => {
      editModal.classList.add("hidden");
      editModal.classList.remove("visible");
    });
    document.getElementById("confirm-edit").addEventListener("click", async () => {
        const editTitle = document.getElementById("edit-title").value;
        console.log("title", editTitle.value);
        const editCountry = document.getElementById("edit-country").value;
        const editCity = document.getElementById("edit-city").value;
        const editDescription = document.getElementById("edit-description").value;
        const editDateFrom = document.getElementById("edit-date-from").value
        const editDateTo = document.getElementById("edit-date-to").value
        const image = "https://example.com/alps.jpg";
        
        const editTravelObj = new Travel(editTitle, editDescription, editDateFrom, editDateTo, editCountry, editCity, image);

        try {
            await putTravel(travelId, editTravelObj);
          } catch (error) {
            console.error("Failed to update travel:", error);
          }
        });
  });

  document.getElementById("output").appendChild(clone);
}
