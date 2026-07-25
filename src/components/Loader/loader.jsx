import React from "react";
import "./loader.css";

const Loader=()=> {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading movies...</p>
    </div>
  );
}

export default Loader;