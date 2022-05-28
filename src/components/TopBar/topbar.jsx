import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./topbar.css";
function TopBar() {
  const [hamClicked, setHamClicked] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setHamClicked(!hamClicked);
  };

  return (
    <>
      <div className={hamClicked ? "topBar mobile" : "topBar"}>
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
              <Link to="/" onClick={() => setHamClicked(!hamClicked)}>
                HOME
              </Link>
            </li>
            <li className="topBarList__item">
              <Link to="/posts" onClick={() => setHamClicked(!hamClicked)}>
                POSTS
              </Link>
            </li>
            {user && (
              <li className="topBarList__item">
                <Link to="/write" onClick={() => setHamClicked(!hamClicked)}>
                  WRITE
                </Link>
              </li>
            )}
            <li className="topBarList__item">
              <Link to="/about" onClick={() => setHamClicked(!hamClicked)}>
                ABOUT
              </Link>
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
            <Link
              className="topBarUserContainer"
              to="/user-settings"
              onClick={() => setHamClicked(!hamClicked)}
            >
              <img
                className="loggedInUserImage"
                src={`http://localhost:5000/users/${user.photo}`}
                alt="userImage"
              />
              {user && <span>{user.fullname}</span>}
            </Link>
          ) : (
            <ul className="topBarList">
              <i className="fa-solid fa-user"></i>
              <li className="topBarList__item">
                <Link
                  className="loginButtonTopbar"
                  to="/login"
                  onClick={() => setHamClicked(!hamClicked)}
                >
                  LOGIN
                </Link>
              </li>
              <li className="topBarList__item">
                <Link
                  className="loginButtonTopbar"
                  to="/signup"
                  onClick={() => setHamClicked(!hamClicked)}
                >
                  SIGNUP
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={() => setHamClicked(!hamClicked)}>
        <div
          className={hamClicked ? "line line-1 clicked" : "line line-1"}
        ></div>
        <div
          className={hamClicked ? "line line-2 clicked" : "line line-2"}
        ></div>
      </div>
    </>
  );
}

export default TopBar;
