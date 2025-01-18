import React from "react";
import "./topbar.css";
import logo from "../assets/logo.png";

const TopBar = () => {
  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default TopBar;
