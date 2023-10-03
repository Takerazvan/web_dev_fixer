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
import AiComponent from "./AiComponent";

import { useAuth } from "../hooks/checkAuth";
import SendResetPasswordLink from "./SendResetPasswordLink";
import ResetPasswordForm from "./ResetPasswordForm";
function App() {
  
   const isLoggedIn = localStorage.getItem("token");
  useAuth();
  

 
console.log(isLoggedIn)

  return (
    <>
      <Router>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/components/buttons" element={<Test />} />
            <Route path="/editPen" element={<Test />} />
            <Route path="/login" element={<LoginRegsiter />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-components" element={<MyComponents />} />
            <Route path="/ai-component" element={<AiComponent />} />
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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
