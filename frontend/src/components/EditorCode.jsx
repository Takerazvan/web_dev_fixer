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
      {activePanel === "html" && (
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
      )}
      {activePanel === "css" && (
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
      )}
      {activePanel === "js" && (
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      )}
    </div>
  );
}
