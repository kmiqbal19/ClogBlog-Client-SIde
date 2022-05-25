import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./userSettingPage.css";
function UserSettingsPage() {
  const { user } = useContext(Context);
  const emailRef = useRef(null);
  const fullnameRef = useRef(null);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(res.data);
      res.data && window.location.replace("/write");
    } catch (err) {
      console.log(err);
      setError(true);
    }
    emailRef.current.value = "";
    fullnameRef.current.value = "";
  };

  return (
    <div className="settingsPageContainer">
      <form className="userSettingsForm" onSubmit={handleSubmit}>
        {!file && (
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
          placeholder="Enter your full name..."
          ref={fullnameRef}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label>Email</label>
        <input
          className="userSettingsInput"
          type="email"
          placeholder="Enter your email..."
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
        <Link to="/change-password">Change Password</Link>
      </form>
    </div>
  );
}

export default UserSettingsPage;
