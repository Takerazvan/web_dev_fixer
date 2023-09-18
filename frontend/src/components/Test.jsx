import React, { useState } from "react";
import "../components/index.css";
import Tabs from "./Tabs";

import Result from "./Result";
import EditorCode from "./EditorCode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { addPen } from "../hooks/addPen";

function Test() {
  const dispatch = useDispatch();

  const html = useSelector((state) => state.html);
  const css = useSelector((state) => state.css);
  const js = useSelector((state) => state.js);

  const [activePanel, setActivePanel] = useState("html");

  const [title, setTitle] = useState("Pen");

  const setHtml = (newHtml) =>
    dispatch({ type: "UPDATE_HTML", payload: newHtml });

  const setCss = (newCss) => dispatch({ type: "UPDATE_CSS", payload: newCss });

  const setJs = (newJs) => dispatch({ type: "UPDATE_JS", payload: newJs });

  const savePen = async () => {
    try {
      const penDetails = {
        userId: 1,
        title,
        html,
        css,
        js,
      };
      const data = await addPen(penDetails);
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
          />
        </Col>

        <Col id="test" className="resize" style={{ overflow: "auto" }}>
          <br />
          <Tabs setActivePanel={setActivePanel} />

          <EditorCode
            activePanel={activePanel}
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
