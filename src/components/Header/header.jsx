import React from "react";
import headerVideo from "../../assets/typing.mp4";
import "./header.css";
import Typical from "react-typical";
function Header() {
  return (
    <div className="header">
      <div className="overlayVideo"></div>
      <video className="headerVideo" src={headerVideo} autoPlay loop muted />
      <p className="headerTextCoder">
        {">"}
        <span>_</span>
      </p>
      <div className="headerTextContainer">
        <Typical
          steps={[
            "create a blog..",
            4000,
            "share post..",
            4000,
            "Sign Up to get access..",
            4000,
          ]}
          loop={Infinity}
        />
      </div>
    </div>
  );
}

export default Header;
