import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { RoutesValues } from "../../consts/routes";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { colors } from "../../consts/colors";

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
          sx={{
            "&.Mui-selected": {
              color: colors.BABY_PINK,
            },
          }}
        />

        <BottomNavigationAction
          icon={<AddPhotoAlternateIcon />}
          onClick={() => navigate(RoutesValues.NEW_POST)}
          sx={{
            "&.Mui-selected": {
              color: colors.BABY_PINK,
            },
          }}
        />

        <BottomNavigationAction
          icon={<PersonIcon />}
          onClick={() => navigate(RoutesValues.PROFILE)}
          sx={{
            "&.Mui-selected": {
              color: colors.BABY_PINK,
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;
