import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css"
export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (error) {
        throw new Error(responseText);
      }

      if (response.ok) {
        console.log("Login Successful:", responseData);
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
          dispatch({ type: "SET_LOGGED_IN", payload: true });
          localStorage.setItem("userId", responseData.userId);
          window.location.href = "http://localhost:3000/newpen";
        } else {
          throw new Error("Unknown error occurred");
        }
      } else {
        throw new Error(`${responseData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  };



  return (
    <div class="login-box">
      <form onSubmit={handleLogin}>
        <div class="user-box">
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
        </div>
        
        <div className="user-box">
          <input
            required
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <center>
          <button
            id="a"
            className="test"
            type="submit"
            style={{ backgroundColor: "grey" }}
          >
            SEND
            <span></span>
          </button>
        </center>
        <a id="a" className="test" href="/register">
          REGISTER
        </a>
      </form>
    </div>
  );
}
