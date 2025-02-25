import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../Bars/topbar";
import BottomNavbar from "../Bars/bottomNavbar";
import { Box } from "@mui/material";
import "./layout.css";

const Layout: React.FC = () => {
  return (
    <Box>
      <TopNavbar />
      <main className="main-box">
        <Outlet />
      </main>
      <BottomNavbar />
    </Box>
  );
};

export default Layout;
