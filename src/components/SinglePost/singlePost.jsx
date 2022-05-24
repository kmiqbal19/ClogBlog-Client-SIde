import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const [catg, setCatg] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data.data.post);
      setCatg(res.data.data.post.categories);

      setTitle(res.data.data.post.title);
      setDescription(res.data.data.post.description);
    };

    fetch();
  }, [path]);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });

      window.location.replace("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleCategory = (e) => {
    const { value, checked } = e.target;

    // Case 1: if user checks the box
    if (checked) {
      setCategories([...categories, value]);
    }
    // Case 2: if user unchecks the box
    else {
      setCategories(categories.filter((el) => el !== value));
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      description,
      categories,
      username: user.username,
    };

    if (file) {
      const data = new FormData();
      const filename = `post-${user._id}-${Date.now()}-updated${file.name}`;
      data.append("name", filename);
      data.append("file", file);
      updatedPost.photo = filename;
      try {
        await axios.post("/posts/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(`/posts/${post._id}`, updatedPost);
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="singlePostContainer">
      {post.photo && !updateMode && (
        <img
          src={`http://localhost:5000/posts/${post.photo}`}
          alt="postPicture"
        />
      )}
      {updateMode && !file && (
        <img
          src={`http://localhost:5000/posts/${post.photo}`}
          alt="postPicture"
        />
      )}
      {updateMode && file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="uploadedImg" />
      )}
      {updateMode && file && !file.type.startsWith("image") && (
        <h1>Please enter image only!</h1>
      )}

      {updateMode ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      ) : (
        <h1 className="singlePostTitleContainer">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEditOptions">
              <i
                className="postEditIcon fa-solid fa-pen-nib"
                onClick={() => setUpdateMode(true)}
              ></i>
              <i
                className="postEditIcon fa-solid fa-trash"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
      )}
      <div className="singlePostCategoryContainer">
        <span>Category: </span>

        {updateMode ? (
          <div className="singlePostCategorySelection">
            <label className="singlePostCatLabel" htmlFor="musicCatg">
              <input
                type="checkbox"
                id="musicCatg"
                name="music"
                value="music"
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
                value="life"
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
                value="animal"
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
                value="science"
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
                value="technology"
                onChange={handleCategory}
              />
              Technology
              <span className="checkmark"></span>
            </label>
          </div>
        ) : (
          <ul className="singlePostCategoryList">
            {catg.map((el, i) => {
              return (
                <Link
                  key={`catSinglePostLink${i}`}
                  to={`/posts/?cat=${el.toLowerCase()}`}
                >
                  <li key={`catSinglePost${i}`}>{`#${el}`} </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author:{" "}
          <Link to={`/posts/?username=${post.username}`}>
            <b>{post.username}</b>
          </Link>{" "}
        </span>
        <span>Date: {new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ? (
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p className="singlePostDescription">{post.description}</p>
      )}
      {updateMode && (
        <button type="submit" onClick={handleUpdate}>
          Update Changes
        </button>
      )}
    </div>
  );
}

export default SinglePost;
