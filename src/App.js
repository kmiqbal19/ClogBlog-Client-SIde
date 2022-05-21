import { Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost/singlePost";
import TopBar from "./components/TopBar/topbar";
import Home from "./pages/homepage/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import WritePage from "./pages/Writepage/WritePage";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlepost" element={<SinglePost />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
