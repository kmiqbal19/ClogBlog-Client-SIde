import React, { useContext, useRef, useState } from "react";

import { Context } from "../../Context/Context";
import axios from "axios";
import "./ChangePassPage.css";
// import axiosInstance from "../../config";
function ChangePassPage() {
  const { user, dispatch } = useContext(Context);
  const currentPassRef = useRef(null);
  const newPassRef = useRef(null);
  const newPassConfRef = useRef(null);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/users/updateMyPassword", {
        id: user._id,
        currentPassword: currentPass,
        password: newPass,
        passwordConfirm: newPassConf,
      });
      console.log(res);
      if (res.data) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/login");
      }
    } catch (err) {
      setError(true);
    }

    currentPassRef.current.value = "";
    newPassRef.current.value = "";
    newPassConfRef.current.value = "";
  };

  return (
    <div className="changePassPageContainer">
      <form className="changePassPageForm" onSubmit={handleSubmit}>
        <img src="https://i.ibb.co/fHbXqCM/pngwing-com-2.png" alt="security" />

        <label>Current Password</label>
        <input
          className="changePassPageInput"
          type="password"
          placeholder="Current Password"
          ref={currentPassRef}
          onChange={(e) => setCurrentPass(e.target.value)}
        />
        <label>New Password</label>
        <input
          className="changePassPageInput"
          type="password"
          placeholder="New Password"
          ref={newPassRef}
          onChange={(e) => setNewPass(e.target.value)}
        />
        {newPass.length > 0 && newPass.length < 8 && (
          <p style={{ color: "red", fontSize: "1rem" }}>
            Password must be atleast 8 character long!
          </p>
        )}
        <label>Password Confirm</label>
        <input
          className="changePassPageInput"
          type="password"
          placeholder="Password Confirm"
          ref={newPassConfRef}
          onChange={(e) => setNewPassConf(e.target.value)}
        />
        {newPassConf.length > 0 && newPass !== newPassConf && (
          <p style={{ color: "red", fontSize: "1rem" }}>
            Password is not same as new password!
          </p>
        )}
        <button
          className="changePassPageButton"
          type="submit"
          disabled={!currentPass || !newPass || !newPassConf}
        >
          Update Password
        </button>
        {error && (
          <p style={{ marginTop: "5px", color: "red", fontSize: "1rem" }}>
            Unable to update! Current password is wrong!
          </p>
        )}
      </form>
    </div>
  );
}

export default ChangePassPage;
