import React from "react";


import Test from "./Test";
import "bootstrap/dist/css/bootstrap.min.css";
import NewPen from "./NewPen";
import NavBar from "./NavBar";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginRegsiter from "./LoginRegsiter";
import Register from "./Register";
import { useSelector } from "react-redux";

import { useAuth } from "../hooks/checkAuth";
function App() {

 useAuth();

  const isLoggedIn = useSelector((state) => state.loggedIn);


  return (
    <>
      <Router>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/components/buttons" element={<Test />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<LoginRegsiter />} />
            <Route path="/register" element={<Register />} />
            {isLoggedIn ? (
              <Route path="/newpen" element={<NewPen />} />
            ) : (
              <Route path="/newpen" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
