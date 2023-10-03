export const addPen = async (penDetails) => {
  try {
    const response = await fetch("http://localhost:9090/aws-pens/addpentoaws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(penDetails),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
