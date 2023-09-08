import React, { useState } from "react";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <div className="container2">
        <div className="heading">Sign In</div>
        <form action="" className="form">
          <input
            required=""
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
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
              href="/@{/oauth2/authorization/github}" // Updated URL to initiate OAuth2
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
              >
                {/* ... the rest of your SVG path ... */}
              </svg>
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
