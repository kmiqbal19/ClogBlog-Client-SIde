import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/post";
import "./postsPage.css";
function PostsPage() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [catg, setCatg] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        search
          ? "/posts" + search
          : `/posts/?search=${query}&cat=${catg}&page=${page}`
      );

      setPosts(res.data.data.posts);
      setPageCount(res.data.pagination.pageCount);
    };
    if (query.length > 2 || query.length === 0) fetchPosts();
    else if (catg !== "") fetchPosts();
  }, [query, search, page, catg]);
  useEffect(() => {
    setPage(1);
  }, [catg, search, query]);
  const handlePreviousPage = (e) => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };
  const handleNextPage = (e) => {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };
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
      <footer>
        <p>Page: {page}</p>
        <p>Page Count: {pageCount} </p>
        <button
          disabled={page === 1}
          onClick={handlePreviousPage}
          style={{
            margin: "2rem",
            backgroundColor: "red",
            padding: "1rem",
            color: "white",
          }}
        >
          Previous
        </button>
        <button
          disabled={page === pageCount}
          onClick={handleNextPage}
          style={{
            margin: "2rem",
            padding: "1rem",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Next
        </button>
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          {Array(pageCount)
            .fill(null)
            .map((_, i) => {
              return <option key={`page${i + 1}`}>{i + 1}</option>;
            })}
        </select>
      </footer>
    </>
  );
}

export default PostsPage;
