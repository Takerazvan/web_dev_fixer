import React, { useEffect, useState } from "react";
import { generateSrcDoc } from "../hooks/generateSrcDoc";

export default function Result({ html, css, js }) {
  const [srcDoc, setSrcDoc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(generateSrcDoc(html, css, js));
        setLoading(false);
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
        position: "relative",
      }}
    >
      {loading && (
        <div
          class="loader"
          style={{ position: "absolute", top: "50%", left: "30%" }}
        >
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      )}
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
