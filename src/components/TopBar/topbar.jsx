import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./topbar.css";
function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
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
          {user && (
            <li className="topBarList__item">
              <Link to="/write">WRITE</Link>
            </li>
          )}
          <li className="topBarList__item">
            <Link to="/about">ABOUT</Link>
          </li>
          {user && (
            <li
              className="topBarList__item logoutButton"
              onClick={handleLogout}
            >
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topBarElement topBar__right">
        {user ? (
          <Link to="/me">
            <img
              className="loggedInUserImage"
              src={`http://localhost:5000/${user.photo}`}
              alt="userImage"
            />
            <span>LISA</span>
          </Link>
        ) : (
          <ul className="topBarList">
            <i className="fa-solid fa-user"></i>
            <li className="topBarList__item">
              <Link className="loginButtonTopbar" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topBarList__item">
              <Link className="loginButtonTopbar" to="/signup">
                SIGNUP
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopBar;
