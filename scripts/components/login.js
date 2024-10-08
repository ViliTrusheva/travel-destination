import { loginUser } from "../api/auth.js";

const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    loginUser(email, password);

  });