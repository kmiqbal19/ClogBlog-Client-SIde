import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/post";
import "./postsPage.css";
function PostsPage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);

      setPosts(res.data.data.posts);
    };
    fetchPosts();
  }, [search]);
  return (
    <div className="postsContainer">
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}

export default PostsPage;
