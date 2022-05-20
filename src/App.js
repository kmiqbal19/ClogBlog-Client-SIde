import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar/topbar";
import Home from "./pages/homepage/Home";

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
