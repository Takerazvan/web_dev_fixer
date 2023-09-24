import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { fetchPens } from "../hooks/fetchData";
import Result from "./Result";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const [pens, setPens] = useState([]);

  const handleCardClick = (pen) => {
    dispatch({ type: "UPDATE_HTML", payload: pen.html });
    dispatch({ type: "UPDATE_CSS", payload: pen.css });
    dispatch({ type: "UPDATE_JS", payload: pen.js });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPens();
        setPens(data);
      } catch (error) {
        console.error("Error fetching pens:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-3">
      <Row xs={1} sm={2} md={2} lg={4} xl={7} className="justify-content-start">
        {pens.map((pen, index) => (
          <Col className="mb-2" key={index} data={pen}>
           
              <Card id="test" className="bg-dark text-white test">
                <Card.Body>
                  <p className="text-center neonText" id="card-title-home">
                    {pen.title}
                </p>
                 <Link to="/test" style={{ textDecoration: "none" }}>
                  <div className="bg-dark">
                    <button
                      id="test"
                      className="ui-btn"
                      onClick={() => handleCardClick(pen)}
                      style={{ marginLeft: "29%" }}
                    >
                      <span>{"</GetCode>"}</span>
                    </button>
                </div>
                </Link>
                  <Result html={pen.html} css={pen.css} js={pen.js} />
                </Card.Body>
              </Card>
            
          </Col>
        ))}
      </Row>
    </Container>
  );
}
