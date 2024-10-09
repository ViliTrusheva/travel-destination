import { postTravel } from "../api/auth.js";
import { getTravels } from "../api/travelsApi.js";
import { formatDate, formatDateWithTime } from "./dateUtils.js";
const form = document.getElementById("create-form");

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
    location: {country: country, city: city},
    image: image,
    createdAt: new Date(),
  };
  postTravel(travelObj);
//   getTravels();
  document.getElementById("create-modal").classList.add("hidden");
  document.getElementById("create-modal").classList.remove("visible");
  populateTemplate(travelObj);
});

// Add an event listener to handle loading the travels
window.addEventListener("load", async () => {
  try {
    const travels = await getTravels();

    travels.forEach((travel) => {
      populateTemplate(travel);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

// Helper function to populate the travel template
function populateTemplate(travel) {
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

  // Check if the user is logged in
  const token = localStorage.getItem("token");
  if (token) {
    clone.getElementById("edit").textContent = "Edit";
    clone.getElementById("delete");
  } else {
    clone.getElementById("edit").classList.add("hidden");
    clone.getElementById("delete").classList.add("hidden");
  }

  document.getElementById("output").appendChild(clone);
}
