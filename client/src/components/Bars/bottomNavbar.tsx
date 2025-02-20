import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { RoutesValues } from "../../consts/routes";
import { useNavigate } from "react-router-dom";

const NavBar = ({}) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate(RoutesValues.HOME)}
        />

        <BottomNavigationAction
          icon={<AddPhotoAlternateIcon />}
          onClick={() => navigate(RoutesValues.NEW_POST)}
        />

        <BottomNavigationAction
          icon={
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />
          }
          onClick={() => navigate(RoutesValues.PROFILE)}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;
