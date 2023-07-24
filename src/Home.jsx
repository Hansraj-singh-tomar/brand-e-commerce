import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import Contact from "./Contact";

const Home = () => {
  const data = {
    name: "Brand Shop",
  };

  return(
  <>
    <HeroSection myData={data} />;
    <Services/>
    <Trusted/>
    <Contact/>
  </>
  )
};

export default Home;