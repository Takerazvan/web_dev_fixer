import React from "react";
import { useSelector, useDispatch } from "react-redux"; 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn); // Access the loggedIn state
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      if (token) {
        const response = await fetch("http://localhost:8000/logout", {
          mode: "cors",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Logout successful", response);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          dispatch({ type: "SET_LOGGED_IN", payload: false });
           navigate("/");
        } else {
          console.log("Logout failed", response);
        }
      } else {
        console.log("No token found in local storage");
      }
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#212121" }}>
      <Container id="test" style={{ backgroundColor: "#212121" }}>
        <Navbar.Brand href="#home" style={{ color: "white" }} id="brand">
          <button data-text="Awesome" className="brand">
            <span className="actual-text">&nbsp;WebDevFixer&nbsp;</span>
            <span className="hover-text" aria-hidden="true">
              &nbsp;WebDevFixer&nbsp;
            </span>
          </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ color: "white" }}>
              Home
            </Nav.Link>
            <NavDropdown
              title={<span style={{ color: "white" }}>Components</span>}
              id="basic-nav-dropdown"
            >
              <Link to="/components/buttons">
                <NavDropdown.Item href="#action/3.1">Buttons</NavDropdown.Item>
              </Link>
              <NavDropdown.Item href="#action/3.2">Cards</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Forms</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            {isLoggedIn ? (
              <Link to="/newpen">
                <Nav.Link href="#link" style={{ color: "white" }}>
                  <button id="create" style={{ color: "white" }}>
                    CREATE
                  </button>
                </Nav.Link>
              </Link>
            ) : (
              <Link to="/login">
                <Nav.Link href="#link" style={{ color: "white" }}>
                  <button id="create" style={{ color: "white" }}>
                    CREATE
                  </button>
                </Nav.Link>
              </Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <button
                className="border-none rounded-lg button button--secondary button--sign-in"
                id="button"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  ></path>
                </svg>
                LOGOUT
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="border-none rounded-lg button button--secondary button--sign-in"
                  id="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    ></path>
                  </svg>
                  Sign in
                </button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
