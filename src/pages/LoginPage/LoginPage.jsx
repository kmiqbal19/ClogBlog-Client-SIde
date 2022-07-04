import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
// import axios from "axios";
import axiosInstance from "../../config";
import "./LoginPage.css";
import Spinner from "../../components/spinner/spinner.js";
import { toast } from "react-toastify";
function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const [error, setError] = useState(false);
  const { fetchError, dispatch, isFetching } = useContext(Context);

  useEffect(() => {
    if (login) {
      toast.dark("✨💖You are succesfully logged in!");
    }
    if (error) {
      toast.error("⚠️ Something went wrong!");
    }

    return () => {
      setLogin(false);
      setError(false);
    };
  }, [error, login]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setEmail("");
      setPassword("");
      if (res.data) {
        setLogin(true);

        window.location.replace("/");
      }
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="loginPageContainer">
      {isFetching && <Spinner />}
      <form className="loginForm" onSubmit={handleSubmit}>
        {login && (
          <p
            style={{
              marginBottom: "1rem",
              color: "green",
              textAlign: "center",
            }}
          >
            🎉 You are successfully logged in!
          </p>
        )}
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
        {fetchError && (
          <span style={{ marginTop: "7px", color: "red" }}>
            Incorrect password or email address!
          </span>
        )}
        {/* <span className="forgotPassLink">
          Forgot password? Click <Link to="/forgotPassword">here</Link>
        </span> */}
        <span className="signupLink">
          Do not have account?{" "}
          <Link
            style={{ color: "lightblue", textDecoration: "underline" }}
            to="/signup"
          >
            Signup
          </Link>{" "}
          here.
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
