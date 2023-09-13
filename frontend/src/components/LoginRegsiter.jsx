import React, { useState } from "react";

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const data = await response.json();
      console.log("Login Successful:", data);

       if (data.token) {
         localStorage.setItem("token", data.token);
          window.location.href = "http://localhost:3000/newpen";
       }


      
    } catch (error) {
      console.error("Error during login:", error);

      // ... Handle login failure (e.g., show an error message)
    }
  };

  return (
    <div>
      <div className="container2">
        <div className="heading">Sign In</div>
        <form onSubmit={handleLogin} className="form">
          <input
            required
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input className="login-button" type="submit" value="Sign In" />
          <span className="forgot-password">
            <a href="/register">REGISTER</a>
          </span>
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="social-button github"
            >
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
              ></svg>
            </a>
          </div>
        </div>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </div>
  );
}
