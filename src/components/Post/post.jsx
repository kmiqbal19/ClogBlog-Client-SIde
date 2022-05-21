import React from "react";
import "./post.css";
function Post() {
  return (
    <div className="postContainer">
      <img
        src="https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg"
        alt="postImage"
      />
      <div className="postInfoContainer">
        <span className="postTitle">Hi i am a blog post</span>
        <ul className="postCategories">
          <li className="postCategoriesItem">#Music</li>
          <li className="postCategoriesItem">#Life</li>
          <li className="postCategoriesItem">#Animal</li>
        </ul>
        <hr />
        <span className="postDate"> 1 hour ago</span>
      </div>
      <p className="postDescription">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus.{" "}
      </p>
    </div>
  );
}

export default Post;
