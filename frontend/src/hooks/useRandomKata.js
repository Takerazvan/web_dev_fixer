import { useState, useEffect } from "react";

const useRandomKata = () => {
  const [kata, setKata] = useState(null);

  useEffect(() => {
    const fetchRandomKata = async () => {
      try {
        // Adjust this API call to fetch a random kata as per the latest Codewars API documentation
        const response = await fetch(
          "https://www.codewars.com/api/v1/code-challenges/kata"
        );
        const data = await response.json();
        const randomKata = data[Math.floor(Math.random() * data.length)];
        setKata(randomKata);
      } catch (error) {
        console.error("Error fetching kata:", error);
      }
    };

    fetchRandomKata();
  }, []);

  return kata;
};

export default useRandomKata;
