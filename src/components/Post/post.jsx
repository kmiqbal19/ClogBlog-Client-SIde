import React from "react";
import "./post.css";

import { Link } from "react-router-dom";
function Post({ post }) {
  return (
    <div className="postContainer">
      {post.photo && (
        <img
          src={`https://clogblog-backend.herokuapp.com/posts/${post.photo}`}
          alt="postImage"
        />
      )}
      <div className="postInfoContainer">
        <Link className="postTitle__link" to={`/posts/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <ul className="postCategories">
          {post.categories.length > 4
            ? post.categories.slice(0, 6).map((el, i) => {
                return (
                  <li key={`cat${i}`} className="postCategoriesItem">
                    <Link to={`/posts/?cat=${el}`}>{`#${el}`}</Link>
                  </li>
                );
              })
            : post.categories.map((el, i) => {
                return (
                  <li key={`cat${i}`} className="postCategoriesItem">
                    <Link to={`/posts/?cat=${el}`}>{`#${el}`}</Link>
                  </li>
                );
              })}
        </ul>
        <div className="postDateAndAuthorContainer">
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          <span className="postAuthor">
            Author:
            <b>
              <Link to={`/posts/?username=${post.username}`}>
                {" "}
                {post.username}
              </Link>
            </b>
          </span>
        </div>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}

export default Post;
