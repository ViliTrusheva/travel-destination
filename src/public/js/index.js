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
  if (!token) {
    hideUserButtons()
  } else {
    showUserButtons();
  }
};

const hideUserButtons = () => {
  const editButtons = document.querySelectorAll("#edit");
  const deleteButtons = document.querySelectorAll("#delete");
  editButtons.forEach(button => button.classList.add("hidden"));
  deleteButtons.forEach(button => button.classList.add("hidden"));
  createBtn.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  signupBtn.classList.remove("hidden");
  loginBtn.classList.remove("hidden");
};

const showUserButtons = () => {
  const editButtons = document.querySelectorAll("#edit");
  const deleteButtons = document.querySelectorAll("#delete");
  editButtons.forEach(button => button.classList.remove("hidden"));
  deleteButtons.forEach(button => button.classList.remove("hidden"));
  createBtn.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  signupBtn.classList.add("hidden");
  loginBtn.classList.add("hidden");
};



window.addEventListener("load", () => {
  isUserLoggedIn();
});
