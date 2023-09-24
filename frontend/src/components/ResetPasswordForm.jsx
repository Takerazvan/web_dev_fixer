import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const extractTokenFromURL = () => {
      const queryParams = new URLSearchParams(window.location.search);
      return queryParams.get("token");
    };
  
    const token = extractTokenFromURL();
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(
          `http://localhost:9090/api/users/reset/password?token=${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: newPassword,
          }
        );

        if (response.ok) {
          setMessage("Password reset successfully!");
        } else {
          setMessage("Password reset failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred.");
      }
    } else {
      alert("Passwords do not match!")
    }

    
  };

   return (
     <div className="login-box">
       <form className="reset-password-form" onSubmit={handleFormSubmit}>
         <div className="user-box">
           <input
             type={showPassword ? "text" : "password"}
             className="input"
             placeholder="New Password"
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             required
           />
           <label>New Password</label>
           <FontAwesomeIcon
             icon={showPassword ? faEyeSlash : faEye}
             onClick={handleTogglePassword}
             className="eye-icon"
             style={{color:"white"}}
           />
         </div>

         <div className="user-box">
           <input
             type={showPassword ? "text" : "password"}
             className="input"
             placeholder="Confirm Password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
           />
           <label>Confirm Password</label>
         </div>

         <div style={{ textAlign: "center" }}>
           <button
             type="submit"
             className="test"
             style={{ backgroundColor: "grey" }}
           >
             Reset Password
             <span></span>
           </button>
         </div >

         {message && <p  className="message" style={{color:"white"}}>{message}</p>}
       </form>
     </div>
   );
}

