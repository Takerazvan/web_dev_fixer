import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Test from "./Test";
import useLocalStorage from "../hooks/useLocalStorage";
import Result from "./Result";

export default function Home() {
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

  const cardData = [
    {
      title: "Card 1",
      text: "Some quick example text for Card 1.",
    },
    {
      title: "Card 2",
      text: "Some quick example text for Card 2.",
    },
    {
      title: "Card 3",
      text: "Some quick example text for Card 3.",
    },
    {
      title: "Card 4",
      text: "Some quick example text for Card 4.",
    },
    // Add more card data as needed
  ];

  return (
    <div style={{ marginTop: "10vh", backgroundColor: "#212121" }}>
      <Container>
        <Row xs={2} md={4} lg={3} className="g-3">
          {cardData.map((card, index) => (
            <Col key={index}>
              <Card
                id="test"
                style={{ width: "22rem", backgroundColor: "#212121" }}
              >
                <Card.Body>
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
