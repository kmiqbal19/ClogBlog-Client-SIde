import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePageMainSection.css";
function HomePageMainSection() {
  const a = [1, 3, 4, 5, 5, 6, 6];
  console.log(a.slice(0, 2));
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");

      setPosts(res.data.data.posts);
    };
    fetchPosts();
  }, []);
  const Posts = () => {
    return posts.slice(0, 3).map((post, index) => {
      return (
        <div key={`homePost${index}`} className="homePostContainer">
          <Link to={`/posts/${post._id}`}>
            <div className="homePostImage">
              <img
                src={`http://localhost:5000/posts/${post.photo}`}
                alt="post-img"
              />
            </div>
          </Link>
          <div className="homePostContainer__Items">
            <p className="homePostContainer__Items--Title">{post.title}</p>
            <p className="homePostContainer__Items--Author">
              Author:{"  "}
              <Link to={`/posts/?username=${post.username}`}>
                <span> {post.username}</span>
              </Link>
            </p>
            <ul>
              {post.categories.splice(0, 4).map((el, i) => {
                return (
                  <Link key={`homePostCatgLink${i}`} to={`/posts/?cat=${el}`}>
                    <li
                      key={`homePostCatg${i}`}
                      className="homePostContainer__Items--Category"
                    >
                      {`#${el}`}
                    </li>
                  </Link>
                );
              })}
            </ul>
            <p className="homePostContainer__Items--Date">
              {/* Posted on <span>{new Date(post.createdAt).toDateString()}</span> */}
              {new Date(post.createdAt).toDateString()}
            </p>
            <p className="homePostContainer__Items--Description">
              {post.description}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <>
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
        <Link to="/posts" className="homeSeeMore">
          <p>SEE MORE</p>
        </Link>
      </div>
      <footer className="homeFooter">
        <p>All rights reserved to K M Iqbal</p>
      </footer>
    </>
  );
}

export default HomePageMainSection;
