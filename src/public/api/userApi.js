// get user by id
export const getUser = async (userId) => {
    const id = userId || "";
    try {
      const response = await fetch(`http://127.0.0.1:3000/users/${id}`, {
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