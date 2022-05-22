import React from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";
function SignUpPage() {
  return (
    <div className="signupPageContainer">
      <form className="signupForm">
        <label>Username</label>
        <input className="signupInput" type="text" placeholder="Username" />
        <label>Email</label>
        <input
          className="signupInput"
          type="email"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="signupInput"
          type="password"
          placeholder="Enter your password..."
        />
        <label>Confirm Password</label>
        <input
          className="signupInput"
          type="password"
          placeholder="Confirm your password..."
        />
        <button className="signupButton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
