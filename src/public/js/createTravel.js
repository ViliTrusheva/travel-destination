import { postTravel } from "../api/auth.js";
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

  postTravel(title, country, city, description, startDate, endDate, image);
});
