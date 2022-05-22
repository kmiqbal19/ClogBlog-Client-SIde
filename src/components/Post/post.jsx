import React from "react";
import "./post.css";
function Post({ post }) {
  console.log("POST", post);
  return (
    <div className="postContainer">
      <img
        src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg"
        alt="postImage"
      />
      <div className="postInfoContainer">
        <span className="postTitle">{post.title}</span>
        <ul className="postCategories">
          {post.categories.map((el) => {
            return <li className="postCategoriesItem">{`#${el}`}</li>;
          })}

          {/* <li className="postCategoriesItem">#Life</li>
          <li className="postCategoriesItem">#Animal</li> */}
        </ul>
        <hr />
        <span className="postDate">{new Date(post.createdAt)}</span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}

export default Post;
