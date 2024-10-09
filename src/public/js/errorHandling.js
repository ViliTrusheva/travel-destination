// errorHandling.js

// Function to display error messages
export const showError = (elementId, message) => {
    const errorElement = document.getElementById(`${elementId}-error-message`);
    const inputElement = document.getElementById(elementId);
    errorElement.textContent = message;
    inputElement.classList.add("input-error");
  };
  
  // Function to clear error messages
  export const clearErrors = (elementId) => {
    const errorElement = document.getElementById(`${elementId}-error-message`);
    const inputElement = document.getElementById(elementId);
    errorElement.textContent = "";
    inputElement.classList.remove("input-error");
  };
  