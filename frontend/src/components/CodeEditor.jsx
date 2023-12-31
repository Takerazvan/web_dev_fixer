import Editor from "./Editor";
import React from "react";

function CodeEditor({ js, setJs }) {
  return (
    <div>
      <Editor
        language="javascript"
        displayName="JS"
        value={js}
        onChange={setJs}
      />
    </div>
  );
}

export default CodeEditor;
