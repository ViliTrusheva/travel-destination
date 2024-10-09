const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modalElement = document.getElementById("create-modal");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  isUserLoggedIn();
});

createBtn.addEventListener("click", () => {
  if (modalElement) {
    console.log("Create button clicked");
    modalElement.classList.remove("hidden");
    modalElement.classList.add("visible");
  }
});

cancelBtn.addEventListener("click", () => {
  if (modalElement) {
    console.log("Cancel button clicked");
    modalElement.classList.remove("visible");
    modalElement.classList.add("hidden");
  }
});

const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  console.log("Token", token);
  const createTravelBtn = document.getElementById("create-btn");
  if (!token) {
    createTravelBtn.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    signupBtn.classList.remove("hidden");
    loginBtn.classList.remove("hidden");
  } else {
    createTravelBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    signupBtn.classList.add("hidden");
    loginBtn.classList.add("hidden");
  }
};

window.addEventListener("load", () => {
  isUserLoggedIn();
});
