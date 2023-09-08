import React, { useEffect, useState } from 'react'
import Editor from './Editor';
import useLocalStorage from "../hooks/useLocalStorage";
export default function EditorCode({
  activePanel,
  setActivePanel,
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  srcDoc,
  setSrcDoc,
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
    <div >
      <div className={`code-panel ${activePanel === "html" ? "active" : ""}`}>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          
        />
      </div>
      <div className={`code-panel ${activePanel === "css" ? "active" : ""}`} >
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
      </div>
      <div className={`code-panel ${activePanel === "js" ? "active" : ""}`}>
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
    </div>
  );
}
