import { Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost/singlePost";
import TopBar from "./components/TopBar/topbar";
import Home from "./pages/homepage/Home";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="singlepost" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
