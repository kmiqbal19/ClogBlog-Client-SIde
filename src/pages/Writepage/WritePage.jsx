import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./WritePage.css";
import { Categories } from "./categories";
function WritePage() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const handleCategory = (e) => {
    const { value, checked } = e.target;
    // console.log(`${value} is ${checked}`);
    // Case 1: if user checks the box
    if (checked) {
      setCategories([...categories, value]);
    }
    // Case 2: if user unchecks the box
    else {
      setCategories(categories.filter((el) => el !== value));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      categories,
      username: user.username,
    };

    if (file) {
      const data = new FormData();
      const filename = `post-${user._id}-${Date.now()}-${file.name}`;
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
  const CategoriesMap = () => {
    return Categories.map((category, index) => {
      return (
        <label
          key={`catLabel${index}`}
          className="singlePostCatLabel"
          htmlFor={category.htmlFor}
        >
          <input
            type="checkbox"
            id={category.inputId}
            name={category.inputName}
            value={category.inputValue}
            onChange={handleCategory}
          />
          {category.labelText}
          <span className="checkmark"></span>
        </label>
      );
    });
  };
  return (
    <div className="writePage">
      {file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="uploadedFile" />
      )}
      {!file && (
        <p style={{ margin: "12vh 5vw", color: "white", fontSize: "3rem" }}>
          Insert an image by clicking{" "}
          <i className="fa-solid fa-circle-plus"></i> icon.
        </p>
      )}
      {file && !file.type.startsWith("image") && (
        <h1>Please enter image file only!</h1>
      )}
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
        <span>Choose Categories: </span>

        <div className="singlePostCategorySelection">
          <CategoriesMap />
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
