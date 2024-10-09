import { postTravel } from "../api/travelsApi.js";
import { populateTemplate } from "./travelCard.js";
import Travel from "../entities/Travel.js";
const form = document.getElementById("create-form");

const username = localStorage.getItem("username");
const user = {nickname: username};

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

  const travelObj = new Travel(title, description, startDate, endDate, country, city, image, user.nickname);

  postTravel(travelObj);
  document.getElementById("create-modal").classList.add("hidden");
  document.getElementById("create-modal").classList.remove("visible");
  populateTemplate(travelObj, user);
});



