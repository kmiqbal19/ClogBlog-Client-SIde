import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePageMainSection.css";
function HomePageMainSection() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");

      setPosts(res.data.data.posts);
    };
    fetchPosts();
  }, []);
  const Posts = () => {
    return posts.map((post, index) => {
      return (
        <div key={`homePost${index}`} className="homePostContainer">
          <Link to={`/posts/${post._id}`}>
            <img
              src={`http://localhost:5000/posts/${post.photo}`}
              alt="post-img"
            />
          </Link>
          <div className="homePostContainer__Items">
            <p className="homePostContainer__Items--Title">{post.title}</p>
            <ul>
              {post.categories.map((el, i) => {
                return (
                  <li
                    key={`homePostCatg${i}`}
                    className="homePostContainer__Items--Category"
                  >{`#${el}`}</li>
                );
              })}
            </ul>
            <p className="homePostContainer__Items--Description">
              {post.description}
            </p>
            <p className="homePostContainer__Items--Date">
              {new Date(post.createdAt).toDateString()}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="homepageMainContainer">
      <p className="servicesHeading">SERVICES</p>

      <div className="homeServicesContainer">
        <div className="homeServiceOptionsContainer">
          <i className="fa-solid fa-file-pen"></i>
          <p>Write Post</p>
        </div>
        <div className="homeServiceOptionsContainer">
          <i className="fa-solid fa-pen-to-square"></i>
          <p>Edit Post</p>
        </div>
        <div className="homeServiceOptionsContainer">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Search Post</p>
        </div>
        <div className="homeServiceOptionsContainer">
          <i className="fa-regular fa-id-card"></i>
          <p>Own Profile</p>
        </div>
      </div>
      <p className="servicesHeading">LATEST POSTS</p>
      <div className="homePageMainPostsContainer">
        <Posts />
      </div>
    </div>
  );
}

export default HomePageMainSection;
