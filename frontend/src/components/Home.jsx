import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Test from "./Test";
import { useAtom } from "jotai";
import { htmlAtom, cssAtom, jsAtom } from "../hooks/Atom";
import useLocalStorage from "../hooks/useLocalStorage";
import Result from "./Result";
import { Link } from "react-router-dom";
export default function Home() {
  
  const [pens, setPens] = useState([]);
  const [activePanel, setActivePanel] = useState("html");
  const [html, setHtml] = useAtom(htmlAtom);
  const [css, setCss] = useAtom(cssAtom);
  const [js, setJs] = useAtom(jsAtom);
  const [srcDoc, setSrcDoc] = useState("");
const [aa,setaa]=useLocalStorage(html)
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


  const handleCardClick = (pen) => {
   setaa(pen.html)
   setHtml(pen.html);
   setCss(pen.css);
   setJs(pen.js);
 };
  return (
    <Container className="mt-3">
      <Row xs={1} sm={2} md={2} lg={4} xl={7} className="justify-content-start">
        {pens.map((pen, index) => (
          <Col className="mb-2" key={index} data={pen}>
            <Link to="/test" style={{textDecoration:"none"}}>
              <Card
                onClick={() => handleCardClick(pen)}
                id="test"
                className="bg-dark text-white test"
              >
                <Card.Body>
                  <p className="text-center">{pen.title || "CATEGORY"}</p>
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
                    <body style="display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden;">
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
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );

}
