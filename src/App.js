import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost/singlePost";
import TopBar from "./components/TopBar/topbar";
import { Context } from "./Context/Context";
import ChangePassPage from "./pages/ChangePassPage/ChangePassPage";
import Home from "./pages/homepage/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostsPage from "./pages/PostsPage/postsPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserSettingsPage from "./pages/userSettingPage/userSettingPage";
import WritePage from "./pages/Writepage/WritePage";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/write" element={user ? <WritePage /> : <SignUpPage />} />
        <Route path="/login" element={user ? <Home /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Home /> : <SignUpPage />} />
        <Route
          path="/user-settings"
          element={user ? <UserSettingsPage /> : <SignUpPage />}
        />
        <Route
          path="/change-password"
          element={user ? <ChangePassPage /> : <SignUpPage />}
        />
      </Routes>
    </>
  );
}

export default App;
