import React, { useState } from "react";
import { registerUser } from "../hooks/registerUser";
import PasswordChecklist from "react-password-checklist";
export default function Register() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // TODO: Add validation before sending data

      try {
        const response = await fetch("http://localhost:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

       
        if (!response.ok) {
          const errorData = await response.text();
          console.log(errorData);

          throw new Error(`${errorData} `);
        }
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
       console.error("Error:", error);
        alert(error.message);
      }
    } else {
      alert("Password not strong enough");
    }

  };

  return (
    <>
      <div className="login-box mt-4" style={{ height: "82vh" }}>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              required
              className="input"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>First Name</label>
          </div>

          <div className="user-box">
            <input
              required
              className="input"
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <label>Last Name</label>
          </div>

          <div className="user-box">
            <input
              required
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <div className="user-box">
            <input
              required
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <div className="user-box">
            <input
              required
              className="input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label>Confirm Password</label>
          </div>

          <center>
            <button
              type="submit"
              className="test"
              id="a"
              style={{ backgroundColor: "grey" }}
            >
              REGISTER
              <span></span>
            </button>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={formData.password}
              valueAgain={formData.confirmPassword}
              messages={{
                minLength: "Password must be at least 8 characters.",
                specialChar: "Password must contain a special character.",
                number: "Password must contain a number.",
                capital: "Password must contain an uppercase letter.",
                match: "Passwords match.",
              }}
              onChange={(isValid) => setIsPasswordValid(isValid)}
              style={{ color: "white", fontSize: "10px" }}
            />
          </center>
        </form>
      </div>
    </>
  );
}
