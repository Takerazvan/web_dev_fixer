import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";

export default function MyComponents() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);
  const [pens, setPens] = useState([]);

  const handleCardClick = (pen) => {
    dispatch({ type: "UPDATE_HTML", payload: pen.html });
    dispatch({ type: "UPDATE_CSS", payload: pen.css });
    dispatch({ type: "UPDATE_JS", payload: pen.js });
  };

  const handleDelete = async (penId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/pens/${penId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPens(pens.filter((pen) => pen.id !== penId));
      } else {
        console.log("Delete failed", response);
      }
    } catch (error) {
      console.log("Error during delete: ", error);
    }
  };

 useEffect(() => {
   const fetchUserPens = async () => {
     try {
       const response = await fetch(`http://localhost:9090/api/pens/${userId}`);

       if (response.ok) {
         const userPens = await response.json();
         setPens(userPens);
       } else {
         console.error("Failed to fetch user pens");
       }
     } catch (error) {
       console.error("Error fetching pens:", error);
     }
   };

   if (userId) {
     fetchUserPens();
   }
 }, [userId]);


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
                    <button onClick={() => handleDelete(pen.id)}>Delete</button>
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
