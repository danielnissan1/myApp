import React from "react";
import hangerImage from "/Users/noa/Desktop/Projects/Degree/webApplications/firstAssignment/myApp/client/src/assets/hanger.jpg";
import { Box } from "@mui/material";

const TopBar = () => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: " #ebe2e2",
        padding: "10px 20px",
        width: "100%",
        direction: "rtl",
      }}
    >
      <img src={hangerImage} alt="Logo" className="logo" height={"50px"} />
    </Box>
  );
};

export default TopBar;
