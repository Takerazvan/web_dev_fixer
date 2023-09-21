import React, { useState} from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { loginUser } from "../hooks/loginUser";
export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
 const handleLogin = async (e) => {
   e.preventDefault();

   try {
     const { token, userId } = await loginUser({ email, password });

     console.log("Login Successful:", { token, userId });

     localStorage.setItem("token", token);
     localStorage.setItem("userId", userId);
     dispatch({ type: "SET_LOGGED_IN", payload: true });
     window.location.href = "http://localhost:3000/newpen";
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
        <div style={{ textAlign: "center" }}>
          <button
            id="a"
            className="test"
            type="submit"
            style={{ backgroundColor: "grey" }}
          >
            SEND
            <span></span>
          </button>
        </div>

        <a id="a" className="test" href="/register">
          REGISTER
        </a>
        <a href="http://localhost:9090/oauth2/authorization/github">
          Login with GitHub
        </a>
      </form>
    </div>
  );
}
