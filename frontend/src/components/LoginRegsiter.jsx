import React, { useState} from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import "../login.css";
import { loginUser } from "../hooks/loginUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  
const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};

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
    <div className="login-box" id="register-box">
      <form onSubmit={handleLogin}>
        <div className="user-box">
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
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={handleTogglePassword}
          className="eye-icon"
          style={{ color: "white" }}
        />
        <div className="user-box">
          <input
            required
            className="input"
            type={showPassword ? "text" : "password"}
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
        <a href="/reset-password">Forgot Password</a>
      </form>
    </div>
  );
}
