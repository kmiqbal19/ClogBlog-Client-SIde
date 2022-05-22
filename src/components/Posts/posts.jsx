import React from "react";
import Post from "../Post/post";
import "./posts.css";
function Posts({ posts }) {
  return (
    <div className="postsContainer">
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}

export default Posts;
