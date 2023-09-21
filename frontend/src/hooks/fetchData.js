export const fetchPens = async () => {
  try {
    const response = await fetch("http://localhost:9090/api/pens");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the pens!", error);
    throw error;
  }
};
