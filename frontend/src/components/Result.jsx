import React, { useEffect, useState } from "react";
import { generateSrcDoc } from "../hooks/generateSrcDoc";

export default function Result({ html, css, js }) {
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(generateSrcDoc(html, css, js));
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div
      id="test"
      style={{
        backgroundColor: "#212121",
        height: "65vh",
        marginTop: "50px",
        marginBottom: "30px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}
