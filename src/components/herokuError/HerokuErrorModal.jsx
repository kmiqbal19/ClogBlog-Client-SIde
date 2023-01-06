import React, { useState } from "react";
import "./HerokuErrorModal.css";
const HerokuErrorModal = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = () => {
    setButtonClicked(true);
  };
  return (
    <div
      className={`herokuapp-error__modal ${
        buttonClicked ? "heroku-modal__hidden" : ""
      }`}
    >
      <div>
        <button onClick={handleClick}>X</button>
        <h1>Announcement for ClogBlog App</h1>
        <p>
          This <span>application's backend</span> does not function since Heroku
          no longer hosts backend apps on its free plans. However, if you're
          curious, you may investigate on POSTMAN or localhost and look at the
          code. Check out the code on this
          <a
            href="https://github.com/kmiqbal19/ClogBlog-Backend-API"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            link{" "}
          </a>
          at your leisure. It uses cloudinary for image storage, JWT
          authentication, and many other things.
        </p>
      </div>
    </div>
  );
};

export default HerokuErrorModal;
