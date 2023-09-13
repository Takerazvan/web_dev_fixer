import React, { useEffect, useState } from "react";
import useRandomKata from "../hooks/useRandomKata";
import CodeEditor from "./CodeEditor";

export default function KataSection() {
  const [code, setCode] = useState("");
  const [kata, setKata] = useState(null);

 useEffect(() => {
   const fetchRandomKata = async () => {
     try {
       const response = await fetch(
         "https://www.codewars.com/api/v1/code-challenges/kata"
       );
       const data = await response.json();
       setKata(data); // Directly set the kata state to data since it's a single kata object
     } catch (error) {
       console.error("Error fetching kata:", error);
     }
   };

   fetchRandomKata();
 }, []);
  return (
    <div>
      {kata ? (
        <div>
          <h1>{kata.name}</h1>
          <p>{kata.description}</p>
          <CodeEditor value={code} onChange={setCode} />
        </div>
      ) : (
        <p style={{backgroundColor:"red"}}>Loading...</p>
      )}
    </div>
  );
}
