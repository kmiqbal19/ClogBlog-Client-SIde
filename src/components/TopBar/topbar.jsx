import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">
            <img
              className="logo"
              src="https://logosmarken.com/wp-content/uploads/2021/08/Blogger-Logo.png"
              alt="df"
            />
          </NavLink>
        </div>
        <div className="topBarElement topBar__center">
          <ul className="topBarList">
            <li className="topBarList__item">
              <NavLink to="/" onClick={() => setHamClicked(!hamClicked)}>
                HOME
              </NavLink>
            </li>
            <li className="topBarList__item">
              <NavLink to="/posts" onClick={() => setHamClicked(!hamClicked)}>
                POSTS
              </NavLink>
            </li>
            {user && (
              <li className="topBarList__item">
                <NavLink to="/write" onClick={() => setHamClicked(!hamClicked)}>
                  WRITE
                </NavLink>
              </li>
            )}
            <li className="topBarList__item">
              <NavLink to="/about" onClick={() => setHamClicked(!hamClicked)}>
                ABOUT
              </NavLink>
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
            <NavLink
              className="topBarUserContainer"
              to="/user-settings"
              onClick={() => setHamClicked(!hamClicked)}
            >
              <img
                className="loggedInUserImage"
                src={`http://localhost:5000/users/${user.photo}`}
                alt="userImage"
              />
              {user && <span>{user.fullname.toUpperCase()}</span>}
            </NavLink>
          ) : (
            <ul className="topBarList">
              {/* <i className="fa-solid fa-user"></i> */}
              <li className="topBarList__item">
                <NavLink
                  className="loginButtonTopbar"
                  to="/login"
                  onClick={() => setHamClicked(!hamClicked)}
                >
                  LOGIN
                </NavLink>
              </li>
              <li className="topBarList__item">
                <NavLink
                  className="loginButtonTopbar"
                  to="/signup"
                  onClick={() => setHamClicked(!hamClicked)}
                >
                  SIGNUP
                </NavLink>
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
