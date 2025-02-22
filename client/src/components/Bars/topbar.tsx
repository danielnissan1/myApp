import React, { useState } from "react";
import hangerImage from "../../assets/hanger.jpg";
import { Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "../Bars/logoutDialog";

const TopBar = () => {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const onLogout = () => {
    setAlertDialogOpen(true);
  };
  const cancelLogout = () => {
    setAlertDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: " #ebe2e2",
        padding: "10px 20px",
        width: "100%",
        direction: "rtl",
      }}
    >
      <IconButton sx={{ ml: "auto", mr: "3rem" }} onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
      <LogoutDialog onClose={cancelLogout} isDialogOpen={alertDialogOpen} />
      <div style={{ flexGrow: 1, textAlign: "center", marginLeft: "15px" }}>
        <img src={hangerImage} alt="Logo" className="logo" height={"50px"} />
      </div>
    </Box>
  );
};

export default TopBar;
