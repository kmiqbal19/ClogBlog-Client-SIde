import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./LoginPage.css";
function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user);
  console.log(isFetching);
  return (
    <div className="loginPageContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <img
          src="https://i.ibb.co/Gdx9GLD/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804cee8a0-5851027215226654768.png"
          alt="defaultUser"
        />
        <label>Email</label>
        <input
          className="loginInput"
          type="email"
          placeholder="Enter your email..."
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          type="submit"
          disabled={!email || !password || isFetching}
        >
          Login
        </button>
        <span className="forgotPassLink">
          Forgot password? Click <Link to="/forgotPassword">here</Link>
        </span>
        <span className="signupLink">
          Do not have account? <Link to="/signup">Signup</Link> here.
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
