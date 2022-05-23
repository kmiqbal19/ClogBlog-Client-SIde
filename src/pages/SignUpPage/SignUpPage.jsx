import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
      const res = await axios.post("/users/signup", {
        username,
        email,
        password,
        passwordConfirm,
      });
      console.log(res);
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
  };
  // console.log(usernameRef.current.value);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      if (res.data.count > 0) {
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    };
    username.length > 4 && fetchUser();
  }, [username]);
  return (
    <div className="signupPageContainer">
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          ref={usernameRef}
          className="signupInput"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {username.length > 4 && (
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
        {password.length > 1 && password.length < 8 && (
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
        {password !== passwordConfirm && (
          <span className="signupPassText">
            Password confirm is not equal to given password!
          </span>
        )}
        <button className="signupButton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
