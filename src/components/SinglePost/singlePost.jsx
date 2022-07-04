// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import axiosInstance from "../../config";
import defaultPostImg from "../../assets/defaultPost.png";
import Spinner from "../../components/spinner/spinner.js";
import { toast } from "react-toastify";
function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [post, setPost] = useState({});
  const [catg, setCatg] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(`/posts/${path}`);
      setPost(res.data.data.post);
      setCatg(res.data.data.post.categories);

      setTitle(res.data.data.post.title);
      setDescription(res.data.data.post.description);
    };

    fetch();
  }, [path]);
  useEffect(() => {
    if (success) {
      setUpdateMode(false);
      toast.dark("✨💖Your post has been updated!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    return () => {
      setSuccess(false);
    };
  }, [success]);
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      if (res) {
        setLoading(false);
        window.location.replace("/posts");
      }
    } catch (err) {
      setLoading(false);
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
    setLoading(true);
    const data = new FormData();
    data.append("username", user.username);
    data.append("title", title);
    data.append("description", description);
    for (let i = 0; i < categories.length; i++) {
      data.append("categories[]", categories[i]);
    }
    if (file) {
      data.append("photo", file);
    }

    try {
      const res = await axiosInstance.put(`/posts/${post._id}`, data);
      if (res.data) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      toast.error("⚠️ Something went wrong!");
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setUpdateMode(false);
  };

  return (
    <div className="singlePostContainer">
      {loading && <Spinner />}
      {!post.photo && <img src={defaultPostImg} alt="post-img" />}
      {post.photo && !updateMode && <img src={post.photo} alt="postPicture" />}
      {updateMode && !file && <img src={post.photo} alt="postPicture" />}
      {updateMode && file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="uploadedImg" />
      )}
      {updateMode && file && !file.type.startsWith("image") && (
        <h1>Please enter image only!</h1>
      )}

      {updateMode ? (
        <div className="singlePostTitleContainer__Edit">
          <label title="Add photos" className="fileEdit" htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="titleEdit"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      ) : (
        <h1 className="singlePostTitleContainer">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEditOptions">
              <i
                title="Edit your post"
                className="postEditIcon fa-regular fa-pen-to-square"
                onClick={() => setUpdateMode(true)}
              ></i>

              <i
                title="Delete your post"
                className="postEditIcon fa-regular fa-trash-can"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
      )}
      <div className="singlePostCategoryContainer">
        <span>{updateMode ? "Choose Categories:" : "Categories:"} </span>

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
              #music
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="foodCatg">
              <input
                type="checkbox"
                id="foodCatg"
                name="food"
                value="food"
                onChange={handleCategory}
              />
              #food
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="natureCatg">
              <input
                type="checkbox"
                id="natureCatg"
                name="nature"
                value="nature"
                onChange={handleCategory}
              />
              #nature
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="positivityCatg">
              <input
                type="checkbox"
                id="positivityCatg"
                name="positivity"
                value="positivity"
                onChange={handleCategory}
              />
              #positivity
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
              #life
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="friendsCatg">
              <input
                type="checkbox"
                id="friendsCatg"
                name="friends"
                value="friends"
                onChange={handleCategory}
              />
              #friends
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="memoriesCatg">
              <input
                type="checkbox"
                id="memoriesCatg"
                name="memories"
                value="memories"
                onChange={handleCategory}
              />
              #memories
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="journeyCatg">
              <input
                type="checkbox"
                id="journeyCatg"
                name="journey"
                value="journey"
                onChange={handleCategory}
              />
              #journey
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="cookingCatg">
              <input
                type="checkbox"
                id="cookingCatg"
                name="cooking"
                value="cooking"
                onChange={handleCategory}
              />
              #cooking
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="familyCatg">
              <input
                type="checkbox"
                id="familyCatg"
                name="family"
                value="family"
                onChange={handleCategory}
              />
              #family
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="schoolCatg">
              <input
                type="checkbox"
                id="schoolCatg"
                name="school"
                value="school"
                onChange={handleCategory}
              />
              #school
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="scienceCatg">
              <input
                type="checkbox"
                id="scienceCatg"
                name="science"
                value="science"
                onChange={handleCategory}
              />
              #science
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="technologyCatg">
              <input
                type="checkbox"
                id="technologyCatg"
                name="technology"
                value="technology"
                onChange={handleCategory}
              />
              #technology
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="astronomyCatg">
              <input
                type="checkbox"
                id="astronomyCatg"
                name="astronomy"
                value="astronomy"
                onChange={handleCategory}
              />
              #astronomy
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="loveCatg">
              <input
                type="checkbox"
                id="loveCatg"
                name="love"
                value="love"
                onChange={handleCategory}
              />
              #love
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="medicalCatg">
              <input
                type="checkbox"
                id="medicalCatg"
                name="medical"
                value="medical"
                onChange={handleCategory}
              />
              #medical
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="tourCatg">
              <input
                type="checkbox"
                id="tourCatg"
                name="tour"
                value="tour"
                onChange={handleCategory}
              />
              #tour
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="religionCatg">
              <input
                type="checkbox"
                id="religionCatg"
                name="religion"
                value="religion"
                onChange={handleCategory}
              />
              #religion
              <span className="checkmark"></span>
            </label>
          </div>
        ) : (
          <ul className="singlePostCategoryList">
            {catg !== [] &&
              catg.map((el, i) => {
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
        <div className="singlePostDescriptionEdit">
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      ) : (
        <p className="singlePostDescription">{post.description}</p>
      )}
      {updateMode && (
        <div className="singlePostUpdateButtonsContainer">
          <button type="submit" onClick={handleUpdate}>
            Update Changes
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
