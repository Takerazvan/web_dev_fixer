import React, { useState } from 'react'

export default function SendResetPasswordLink() {
  const [email, setEmail] = useState("");


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data =  email ; 

    try {
      const response = await fetch("http://localhost:9090/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else {
        alert("Email Sent");
      }

     
    } catch (error) {
    alert(error)
      console.error("Error: ", error);
    }
  };

  return (
    <div className="login-box">
      <div className="title">
        <h1 style={{ color: "white",fontSize:"30px" }}>Reset Password</h1>
      </div>
      <form className="reset-password-form mt-5" onSubmit={handleFormSubmit}>
        <div className="user-box">
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="test"
            type="submit"
            style={{ backgroundColor: "grey" }}
          >
            Send Email
            <span></span>
          </button>
        </div>
      </form>
    </div>
  );
}
