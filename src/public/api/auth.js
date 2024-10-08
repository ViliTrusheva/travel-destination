export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status === 200) {
      console.log("User logged in successfully");
    } else {
      console.error("Login failed with status:", response.status);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const registerUser = async (newUser, newEmail, newPassword) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: newUser,
        email: newEmail,
        password: newPassword,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postTravel = async (
  title,
  city,
  country,
  description,
  startDate,
  endDate,
  imageFile
) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/travel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        location: { country: country, city: city },
        description: description,
        dateFrom: startDate,
        dateTo: endDate,
        image: imageFile,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
