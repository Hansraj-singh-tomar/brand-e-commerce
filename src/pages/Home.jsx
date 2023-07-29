import React from "react";
import HeroSection from "./subPages/HeroSection";
import Services from "./subPages/Services";
import Trusted from "./subPages/Trusted";
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