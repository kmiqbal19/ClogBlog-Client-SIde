import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/post";
import "./postsPage.css";
function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [catg, setCatg] = useState("");
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get("/posts" + search + `/?search=${query}`);
      const res = await axios.get(
        search ? "/posts" + search : `/posts/?search=${query}`
      );
      console.log(res.data.data.posts.length);
      setPosts(res.data.data.posts);
    };
    if (query.length > 2 || query.length === 0) fetchPosts();
  }, [query, search]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/?cat=${catg}`);

      setPosts(res.data.data.posts);
    };
    if (catg !== "") fetchPosts();
  }, [catg]);
  return (
    <>
      {!search && (
        <div className="searchCatContainer">
          <input
            type="text"
            placeholder="Search..."
            className="searchBar"
            onChange={(e) => setQuery(e.target.value)}
          />
          <select onChange={(e) => setCatg(e.target.value)}>
            <option defaultValue="">None</option>
            <option value="music">Music</option>
            <option value="guitar">Guitar</option>
            <option value="pizza">pizza</option>
          </select>
        </div>
      )}
      <div className="postsContainer">
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </>
  );
}

export default PostsPage;
