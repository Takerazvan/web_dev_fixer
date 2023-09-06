import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

export default function Result({
 
  html,
 
  css,
  
  js,
 
  srcDoc,
  setSrcDoc
}) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div
      id="test"
      style={{
        backgroundColor: "#212121",
        height: "50vh",
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
