import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
function TopBar() {
  const user = true;
  return (
    <div className="topBar">
      <div className="topBarElement topBar__left">
        <Link to="/">
          <img
            className="logo"
            src="https://logosmarken.com/wp-content/uploads/2021/08/Blogger-Logo.png"
            alt="df"
          />
        </Link>
      </div>
      <div className="topBarElement topBar__center">
        <ul className="topBarList">
          <li className="topBarList__item">
            <Link to="/">HOME</Link>
          </li>
          <li className="topBarList__item">
            <Link to="/posts">POSTS</Link>
          </li>
          <li className="topBarList__item">
            <Link to="/write">WRITE</Link>
          </li>
          <li className="topBarList__item">
            <Link to="/about">ABOUT</Link>
          </li>
          {user && <li className="topBarList__item">LOGOUT</li>}
        </ul>
      </div>
      <div className="topBarElement topBar__right">
        {user ? (
          <Link to="/me">
            <img
              className="loggedInUserImage"
              src="https://media.allure.com/photos/5a26c1d8753d0c2eea9df033/1:1/w_1394,h_1394,c_limit/mostbeautiful.jpg"
              alt="userImage"
            />
            <span>LISA</span>
          </Link>
        ) : (
          <ul className="topBarList">
            <i className="fa-solid fa-user"></i>
            <li className="topBarList__item">
              <Link className="loginButton" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopBar;
