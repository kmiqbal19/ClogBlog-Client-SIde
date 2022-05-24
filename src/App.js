import { Routes, Route } from "react-router-dom";

import SinglePost from "./components/SinglePost/singlePost";
import TopBar from "./components/TopBar/topbar";
import Home from "./pages/homepage/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostsPage from "./pages/PostsPage/postsPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserSettingsPage from "./pages/userSettingPage/userSettingPage";
import WritePage from "./pages/Writepage/WritePage";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user-settings" element={<UserSettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
