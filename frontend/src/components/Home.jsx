import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Test from "./Test";
import useLocalStorage from "../hooks/useLocalStorage";
import Result from "./Result";

export default function Home() {
  const [pens, setPens] = useState([]);
  const [activePanel, setActivePanel] = useState("html");
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/pens")
      .then((response) => response.json())
      .then((data) => setPens(data))
      .catch((error) =>
        console.error("There was an error fetching the pens!", error)
      );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
           <html>
         <body style="display: flex; justify-content: center; align-items: center; height: 100vh;overflow: hidden;">
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



  return (
    <div style={{ marginTop: "5vh", backgroundColor: "#212121" }}>
      <Container>
        <Row xs={2} md={4} lg={3} className="g-3">
          {pens.map((pen, index) => (
            <Col key={index} data={pen}>
              <Card
                id="test"
                style={{ width: "22rem", backgroundColor: "#212121" }}
              >
                <Card.Body className="card-body">
                  <p style={{ color: "white", textAlign: "center" }}>
                    {pen.title || "CATEGORY"}
                  </p>
                  <Result
                    activePanel={activePanel}
                    setActivePanel={setActivePanel}
                    html={pen.html}
                    setHtml={setHtml}
                    css={pen.css}
                    setCss={setCss}
                    js={pen.js}
                    setJs={setJs}
                    srcDoc={`
                      <html>
                        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; ">
                          ${pen.html}
                        </body>
                        <style>
                          ${pen.css}
                        </style>
                        <script>
                          ${pen.js}
                        </script>
                      </html>
                    `}
                    setSrcDoc={setSrcDoc}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
