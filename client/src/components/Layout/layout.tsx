import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../Bars/topbar";
import BottomNavbar from "../Bars/bottomNavbar";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box>
      <TopNavbar />
      <main>
        <Outlet />
      </main>
      <BottomNavbar />
    </Box>
  );
};

export default Layout;
