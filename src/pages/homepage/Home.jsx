import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Header from "../../components/Header/header";
import Posts from "../../components/Posts/posts";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");

      setPosts(res.data.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Header />
      <Posts posts={posts} />
    </>
  );
}

export default Home;
