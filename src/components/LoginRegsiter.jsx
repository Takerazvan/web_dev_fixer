import React from 'react'

export default function LoginRegsiter() {
  return (
    <div>
      <div class="container2">
        <div class="heading">Sign In</div>
        <form action="" class="form">
          <input
            required=""
            class="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            class="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span class="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input class="login-button" type="submit" value="Sign In" />
        </form>
        <div class="social-account-container">
          <span class="title">Or Sign in with</span>
          <div class="social-accounts">
           
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-button github"
            >
              <svg
                class="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.29 6.533 5.47 7.59.4.074.547-.174.547-.385 0-.19-.007-.693-.01-1.36-2.227.485-2.695-1.077-2.695-1.077-.364-.925-.89-1.171-.89-1.171-.727-.497.055-.487.055-.487.805.057 1.232.837 1.232.837.717 1.224 1.883.871 2.34.665.073-.528.281-.88.51-1.084-1.785-.205-3.655-.892-3.655-3.968 0-.876.313-1.592.826-2.153-.083-.207-.358-1.023.078-2.13 0 0 .678-.217 2.22.826.644-.18 1.33-.27 2.015-.274.685.004 1.371.094 2.016.274 1.541-1.043 2.218-.826 2.218-.826.438 1.107.163 1.923.08 2.13.514.56.825 1.276.825 2.153 0 3.084-1.873 3.76-3.66 3.96.287.248.54.735.54 1.48 0 1.067-.01 1.927-.01 2.19 0 .213.144.462.55.382C13.713 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8z"
                />
              </svg>
            </a>
          </div>
        </div>
        <span class="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </div>
  );
}
