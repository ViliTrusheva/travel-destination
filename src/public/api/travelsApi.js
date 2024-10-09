export const getTravels = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/travels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteTravel = async (travelId) => {
  const id = travelId || "";
  const token = localStorage.getItem("token");
  console.log("Token from local", token);
  try {
    const response = await fetch(`http://127.0.0.1:3000/auth/travel/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    });

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
