// ******************* Signup Form Validation ******************* //

const form = document.getElementById("signup-form");

// Function to display error message
function displayErrorMessage(inputElement, message) {
  // Remove any existing error message
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains("error-message")) {
    existingError.remove();
  }

  // Create a new span element for the error message
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;

  // Insert the error message after the input element
  inputElement.insertAdjacentElement("afterend", errorMessage);
}

// Event listener for the form to handle submit
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  const newPassword = document.getElementById("password").value;
  const newRepeatedPassword = document.getElementById("repeated-password").value;
  const newUser = document.getElementById("username").value;
  const newEmail = document.getElementById("email").value;

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Conditions for the form inputs
  const emailCondition = !emailRegex.test(newEmail);
  const usernameCondition = newUser.length < 4 || newUser.length > 30;
  const passwordCondition = newPassword.length < 8 || newPassword !== newRepeatedPassword;

  let hasError = false;

  // Check email condition
  if (emailCondition) {
    const emailInput = document.getElementById("email");
    emailInput.classList.add("input-error");
    displayErrorMessage(emailInput, "Invalid email, it must be a valid email address");
    hasError = true;
  }

  // Check username condition
  if (usernameCondition) {
    const usernameInput = document.getElementById("username");
    usernameInput.classList.add("input-error");
    if (newUser.length < 4) {
      document.getElementById("usernameHelpMessage").classList.add("hidden");
      displayErrorMessage(usernameInput, "Username must be at least 4 characters long");
    } else {
      displayErrorMessage(usernameInput, "Username must be under 30 characters long");
    }
    hasError = true;
  }

  // Check password condition
  if (passwordCondition) {
    const passwordInput = document.getElementById("password");
    const repeatedPasswordInput = document.getElementById("repeated-password");
    passwordInput.classList.add("input-error");
    repeatedPasswordInput.classList.add("input-error");
    if (newPassword.length < 8) {
      document.getElementById("passwordHelpMessage").classList.add("hidden");
      displayErrorMessage(passwordInput, "Password must be at least 8 characters long");
    } else {
      displayErrorMessage(repeatedPasswordInput, "Passwords do not match");
    }
    hasError = true;
  }

  // If there are any errors, prevent form submission
  if (hasError) {
    return;
  }

  // If all conditions are met, alert the user that the form was submitted successfully
  alert("Form submitted successfully!");
});
