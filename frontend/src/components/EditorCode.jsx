import React from "react";
import Editor from "./Editor";

export default function EditorCode({
  activePanel,

  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
}) {
  return (
    <div>
      <div className={`code-panel ${activePanel === "html" ? "active" : ""}`}>
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
      </div>
      <div className={`code-panel ${activePanel === "css" ? "active" : ""}`}>
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
