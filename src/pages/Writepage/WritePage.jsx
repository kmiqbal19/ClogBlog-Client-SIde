import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import "./WritePage.css";
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
      // res.data && window.location.replace(`/posts/${res.data.data.post._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="writePage">
      {file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="uploadedFile" />
      )}
      {!file && <img src="https://i.ibb.co/TwvswzZ/pngwing-com.png" alt="" />}
      {file && !file.type.startsWith("image") && (
        <h1>Please enter image file only!</h1>
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <span>Category: </span>

        <div className="singlePostCategorySelection">
          <label className="singlePostCatLabel" htmlFor="musicCatg">
            <input
              type="checkbox"
              id="musicCatg"
              name="music"
              value="Music"
              onChange={handleCategory}
            />
            Music
            <span className="checkmark"></span>
          </label>

          <label className="singlePostCatLabel" htmlFor="lifeCatg">
            <input
              type="checkbox"
              id="lifeCatg"
              name="life"
              value="Life"
              onChange={handleCategory}
            />
            Life
            <span className="checkmark"></span>
          </label>

          <label className="singlePostCatLabel" htmlFor="animalCatg">
            {" "}
            <input
              type="checkbox"
              id="animalCatg"
              name="animal"
              value="Animal"
              onChange={handleCategory}
            />
            Animal
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="scienceCatg">
            {" "}
            <input
              type="checkbox"
              id="scienceCatg"
              name="science"
              value="Science"
              onChange={handleCategory}
            />
            Science
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="technoCatg">
            {" "}
            <input
              type="checkbox"
              id="technoCatg"
              name="technology"
              value="Technology"
              onChange={handleCategory}
            />
            Technology
            <span className="checkmark"></span>
          </label>
        </div>
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
