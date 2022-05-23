import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./SignUpPage.css";

function SignUpPage() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [available, setAvailable] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the form data
      const res = await axios.post("/users/signup", {
        username,
        email,
        password,
        passwordConfirm,
      });
      // Delete the input values
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      passwordConfRef.current.value = "";
      // Change window location to login page
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  // Using this useEffect for checking available username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      if (res.data.count > 0) {
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    };
    username.length >= 3 && fetchUser();
  }, [username]);
  return (
    <div className="signupPageContainer">
      <form className="signupForm" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/yBwmZh6/default.png" alt="avatar" />
        <label>Username</label>
        <input
          ref={usernameRef}
          className="signupInput"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {username.length >= 3 && (
          <span
            className="signupPassText"
            style={{ color: `${available ? "green" : "red"}` }}
          >
            {available ? "Username available!" : "Username not available!"}
          </span>
        )}
        <label>Email</label>
        <input
          ref={emailRef}
          className="signupInput"
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          className="signupInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {password.length > 0 && password.length < 8 && (
          <span className="signupPassText">
            Password must be atleast 8 character long!
          </span>
        )}
        <label>Confirm Password</label>
        <input
          ref={passwordConfRef}
          className="signupInput"
          type="password"
          placeholder="Confirm your password..."
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {passwordConfirm.length > 0 && password !== passwordConfirm && (
          <span className="signupPassConfText">
            Password confirm is not equal to given password!
          </span>
        )}
        <button
          className="signupButton"
          disabled={!username || !email || !password || !passwordConfirm}
        >
          Sign Up
        </button>
        {error && (
          <span className="signupErrorText">Something went wrong!!!</span>
        )}
      </form>
    </div>
  );
}

export default SignUpPage;
