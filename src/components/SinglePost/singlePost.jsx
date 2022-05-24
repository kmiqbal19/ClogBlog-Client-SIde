import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const user = true;
  const [post, setPost] = useState({});
  const [catg, setCatg] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data.data.post);
      setCatg(res.data.data.post.categories);
    };

    fetch();
  }, []);

  return (
    <div className="singlePostContainer">
      {post.photo && (
        <img
          src={`http://localhost:5000/posts/${post.photo}`}
          alt="postPicture"
        />
      )}
      <h1 className="singlePostTitleContainer">
        {post.title}
        <div className="singlePostEditOptions">
          <i
            className="postEditIcon fa-solid fa-pen-nib"
            onClick={() => setEdit(true)}
          ></i>
          <i className="postEditIcon fa-solid fa-trash"></i>
        </div>
      </h1>
      <div className="singlePostCategoryContainer">
        <span>Category: </span>

        {edit ? (
          <form className="singlePostCategorySelection">
            <label className="singlePostCatLabel" htmlFor="musicCatg">
              <input
                type="checkbox"
                id="musicCatg"
                name="music"
                value="Music"
              />
              Music
              <span className="checkmark"></span>
            </label>

            <label className="singlePostCatLabel" htmlFor="lifeCatg">
              <input type="checkbox" id="lifeCatg" name="life" value="Life" />
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
              />
              Technology
              <span className="checkmark"></span>
            </label>
          </form>
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
      <p className="singlePostDescription">{post.description}</p>
    </div>
  );
}

export default SinglePost;
