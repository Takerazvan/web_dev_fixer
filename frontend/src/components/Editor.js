import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/mode/sass/sass.js";
import "codemirror/mode/pug/pug.js";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

export default function Editor(props) {
  const { language, displayName, value, onChange } = props;

  const [themeColor, setThemeColor] = useState("base16-dark");
  const changeTheme = () => {
    if (themeColor === "base16-dark") {
      setThemeColor("the-matrix");
    } else {
      setThemeColor("base16-dark");
    }
  };

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div>
      <div
        className="editor-title"
        style={{
          backgroundColor: "#212121",
          color: "rgb(192, 255, 20)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {displayName}

        <label className="switch">
          <input onChange={changeTheme} type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: themeColor,
          lineNumbers: true,
        }}
      />
    </div>
  );
}
