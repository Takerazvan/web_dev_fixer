import React, { useState,useEffect } from "react";
import "../components/index.css"
import Tabs from "./Tabs";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import Result from "./Result";
import EditorCode from "./EditorCode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



function Test() {
  const [activePanel, setActivePanel] = useState("html");
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
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
    <Container className="border-none rounded-x2 overflow-hidden max-w-full">
      <Row
        style={{
          backgroundColor: "#212121",
          marginTop: "30px",
          borderRadius: "20px",
        }}
      >
        <Col md={5}>
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

        <Col id="test" className="resize" style={{height:"65vh"}}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
