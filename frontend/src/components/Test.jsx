import React, { useState, useEffect } from "react";
import "../components/index.css";
import Tabs from "./Tabs";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import Result from "./Result";
import EditorCode from "./EditorCode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { savePen } from "../hooks/savePen";
import { useAtom } from "jotai";
import { htmlAtom,cssAtom,jsAtom } from "../hooks/Atom";
function Test() {
  const [activePanel, setActivePanel] = useState("html");
  const [html, setHtml] = useAtom(htmlAtom);
  const [css, setCss] = useAtom(cssAtom);
  const [js, setJs] = useAtom(jsAtom);

  
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
         <html>
       <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; box-sizing: border-box; overflow: auto;">
           ${html}
         </body>
         <style>
           ${css}
         </style>
         <script>
           ${js}
         </script>
       </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const [title, setTitle] = useState("Pen");

  const savePen = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/addpen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          title,
          html,
          css,
          js,
        }),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="border-none rounded-x2 overflow-hidden">
      <Row
        style={{
          backgroundColor: "#212121",
          marginTop: "30px",
          borderRadius: "20px",
        }}
      >
        <Col md={6}>
          <Result
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
            srcDoc={srcDoc}
            setSrcDoc={setSrcDoc}
          />
        </Col>

        <Col id="test" className="resize" style={{ overflow: "auto" }}>
          <br />
          <Tabs
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
            srcDoc={srcDoc}
            setSrcDoc={setSrcDoc}
          />

          <EditorCode
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
            srcDoc={srcDoc}
            setSrcDoc={setSrcDoc}
          />
          <br />
        
          <div
            class="input-container"
            style={{ width: "30vh", maxWidth: "auto", marginLeft: "50px" }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name"
            />
            <button onClick={savePen} class="button">
              Add
            </button>
          </div>
       
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
