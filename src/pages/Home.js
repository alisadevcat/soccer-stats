import React from "react";
import hero_home from "../assets/images/hero-home.jpeg";

const Home = () => {
  return (
    <div className="text-center">
      <h2 className="mt-2 mb-1">
        SoccerStats: Football Stats, Tables & Results
      </h2>
      <p className="mt-1 mb-1">
        «Приложение для просмотра спортивной статистики «SoccerStat»
      </p>
      <img src={hero_home} alt="SoccerStats" className="responsive" />
    </div>
  );
};
export default Home;
