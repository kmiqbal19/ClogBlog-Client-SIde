import React from "react";
import headerVideo from "../../assets/typing.mp4";
import "./header.css";
import Typical from "react-typical";
function Header() {
  return (
    <div className="header">
      <div className="headerWelcome">
        <p>WELCOME TO CLOG BLOG</p>
      </div>
      <div className="headerVideoContainer">
        <div className="overlayVideo"></div>
        <video className="headerVideo" src={headerVideo} autoPlay loop muted />
        <p className="headerTextCoder">
          {">"}
          <span>_</span>
        </p>
        <div className="headerTextContainer">
          <Typical
            steps={[
              "Create post..",
              4000,
              "tell your story...",
              4000,
              "Sign Up..",
              4000,
            ]}
            loop={Infinity}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
