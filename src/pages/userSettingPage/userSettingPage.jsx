import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./userSettingPage.css";
function UserSettingsPage() {
  const { user, dispatch } = useContext(Context);
  const emailRef = useRef(null);
  const fullnameRef = useRef(null);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUserInfo = {
      email,
      fullname,
      username: user.username,
      id: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = `user-${user._id}-${Date.now()}-${file.name}`;
      data.append("name", filename);
      data.append("file", file);
      updatedUserInfo.photo = filename;
      try {
        await axios.post("/users/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.patch("/users/updateMe", updatedUserInfo);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data.data.updatedUser });
      setUpdate(true);
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
      setError(true);
    }
    emailRef.current.value = "";
    fullnameRef.current.value = "";
    setEmail("");
    setFullname("");
    setFile(null);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };
  return (
    <div className="settingsPageContainer">
      <form className="userSettingsForm" onSubmit={handleSubmit}>
        {update && (
          <p
            style={{
              color: "green",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Your profile has been updated successfully!{" "}
          </p>
        )}
        {!file && user && (
          <img
            src={`http://localhost:5000/users/${user.photo}`}
            alt="defaultUser"
          />
        )}

        {file && file.type.startsWith("image") && (
          <img src={URL.createObjectURL(file)} alt="uploadedFile" />
        )}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label>Full Name</label>
        <input
          className="userSettingsInput"
          type="text"
          placeholder={user.fullname}
          ref={fullnameRef}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label>Email</label>
        <input
          className="userSettingsInput"
          type="email"
          placeholder={user.email}
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="userSettingsUpdateButton"
          type="submit"
          disabled={!email || !fullname}
        >
          Update
        </button>
        {error && (
          <p style={{ marginTop: "5px", color: "red", fontSize: "1rem" }}>
            Something went wrong! Please try again later!
          </p>
        )}
        <button
          className="userSettingsLogoutButton"
          disabled={email || fullname}
          onClick={handleLogout}
        >
          Log Out
        </button>

        <Link to="/change-password" style={{ marginTop: "10px" }}>
          Change Password
        </Link>
      </form>
    </div>
  );
}

export default UserSettingsPage;
