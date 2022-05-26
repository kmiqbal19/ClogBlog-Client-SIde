import React from "react";

import "./Home.css";
import Header from "../../components/Header/header";
import HomePageMainSection from "../../components/HomePageMainSection/HomePageMainSection";

function Home() {
  return (
    <div className="homepageContainer">
      <Header />
      <HomePageMainSection />
    </div>
  );
}

export default Home;
