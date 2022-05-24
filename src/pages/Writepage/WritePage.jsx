import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./WritePage.css";
function WritePage() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      username: user.username,
    };
    if (file) {
      console.log(file);
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/posts/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      console.log(res);
      res.data && window.location.replace(`/posts/${res.data.data.post._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="writePage">
      {file && <img src={URL.createObjectURL(file)} alt="uploadedFile" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroupUp">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeTitleInput"
            type="text"
            placeholder={"Write your story title here..."}
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroupDown">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default WritePage;
