import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
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

     if (response.ok) {
       const { token, userId } = await response.json();
       console.log("Login Successful:", { token, userId });

       localStorage.setItem("token", token);
       localStorage.setItem("userId", userId);
       dispatch({ type: "SET_LOGGED_IN", payload: true });
       window.location.href = "http://localhost:3000/newpen";
     } else {
       const errorMessage = await response.text();
       throw new Error(errorMessage);
     }
   } catch (error) {
     console.error("Error during login:", error);
     alert(error.message);
   }
 };


  return (
    <div class="login-box" >
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
