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
        <div id="container-loader" style={{position:"relative", top:"33%"}}>
          <label class="loading-title">Loading ...</label>
          <span class="loading-circle sp1">
            <span class="loading-circle sp2">
              <span class="loading-circle sp3"></span>
            </span>
          </span>
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
