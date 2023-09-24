import React from "react";

import MyComponents from "./MyComponents";
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
import SendResetPasswordLink from "./SendResetPasswordLink";
import ResetPasswordForm from "./ResetPasswordForm";
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

            <Route
              path="/reset-password"
              element={<SendResetPasswordLink />}
            ></Route>
            <Route
              path="/reset-password-form"
              element={<ResetPasswordForm />}
            ></Route>
            {isLoggedIn ? (
              <Route path="/newpen" element={<NewPen />} />
            ) : (
              <Route path="/newpen" element={<Navigate to="/login" />} />
            )}
            {isLoggedIn ? (
              <Route path="/my-components" element={<MyComponents />} />
            ) : (
              <Route path="/my-components" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
