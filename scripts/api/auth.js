
export const loginUser = async (email, password) => {
  localStorage.clear();
    try {
        const response = await fetch("http://127.0.0.1:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:email, password: password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("User logged in succesfully", data);
          console.log("JWT token", data.token);
            localStorage.setItem("token", data.token);
            // window.location.href = "./profile.html";
        } else{
          console.log(data.message);
          displayErrorMessage(data.message); // Function to display error message on the frontend
        }
      }catch (error) {
        console.error("Error:", error);
        displayErrorMessage("Server error"); // Display a generic error message
      }
  }

// Function to display error message on the frontend
const displayErrorMessage = (message) => {
  const errorElement = document.getElementById("error-message");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
};

  

export const registerUser = async (newUser, newEmail, newPassword) => {
    try {
        const response = await fetch("http://127.0.0.1:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: newUser, email: newEmail, password: newPassword }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log(data);
          console.log("User created successfully");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
}