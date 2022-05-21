import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
function LoginPage() {
  return (
    <div className="loginPageContainer">
      <form className="loginForm">
        {/* <span className="loginTitle">Login</span> */}
        <img
          src="https://i.ibb.co/Gdx9GLD/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804cee8a0-5851027215226654768.png"
          alt="defaultUser"
        />
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="loginButton">Login</button>
        <span className="signupLink">
          Do not have account? <Link to="/signup">Signup</Link> here.
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
