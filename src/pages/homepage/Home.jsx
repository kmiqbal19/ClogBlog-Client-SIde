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
      console.log(res);
      setPosts(res.data.data.posts);
      console.log(posts);
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
