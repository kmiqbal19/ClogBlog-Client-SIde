import React from "react";
import "./post.css";

import { Link } from "react-router-dom";
function Post({ post }) {
  return (
    <div className="postContainer">
      {post.photo && (
        <img
          src={`http://localhost:5000/posts/${post.photo}`}
          alt="postImage"
        />
      )}
      <div className="postInfoContainer">
        <span className="postTitle">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </span>
        <ul className="postCategories">
          {post.categories.map((el, i) => {
            return (
              <li key={`cat${i}`} className="postCategoriesItem">{`#${el}`}</li>
            );
          })}
        </ul>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}

export default Post;
