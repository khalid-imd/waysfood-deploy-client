import React from "react";
import Hero from "../components/hero";
import NearResto from "../components/nearResto";
import PopularResto from "../components/popularResto";

const Landing = () => {
  return (
    <div>
      <Hero />
      <PopularResto />
      <NearResto />
    </div>
  );
};

export default Landing;
