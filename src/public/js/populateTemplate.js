import { formatDate, formatDateWithTime, reFormatDate } from "./dateUtils.js";
import { showDeleteModal, showEditModal } from "./modalHandlers.js";

export function populateTemplate(travel, user) {
  let temp = document.getElementById("travel-template");
  let clone = temp.content.cloneNode(true);

  clone.getElementById("title").textContent = travel.title;
  clone.getElementById("location").textContent = `${travel.location.city}, ${travel.location.country}`;
  clone.getElementById("description").textContent = travel.description;
  clone.getElementById("date-from").textContent = formatDate(travel.dateFrom);
  clone.getElementById("date-to").textContent = formatDate(travel.dateTo);
  clone.getElementById("created").textContent = `Posted on: ${formatDateWithTime(travel.createdAt)}`;
  clone.getElementById("username").textContent = user.nickname;

  const travelId = travel._id;
  const token = localStorage.getItem("token");

  if (token) {
    clone.getElementById("edit").textContent = "Edit";
    clone.getElementById("delete").addEventListener("click", () => showDeleteModal(travelId));
    clone.getElementById("edit").addEventListener("click", () => showEditModal(travel));
  } else {
    clone.getElementById("edit").classList.add("hidden");
    clone.getElementById("delete").classList.add("hidden");
  }

  document.getElementById("output").appendChild(clone);
}