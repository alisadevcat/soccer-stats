import React from "react";
import ErrorImage from "../assets/images/errorpage.png";

const NotFound = () => {
  return (
    <div className="container">
      <img src={ErrorImage} alt ="Page isn't found"/>
    </div>
  );
};
export default NotFound;
