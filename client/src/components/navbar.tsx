import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import "./navbar.css";
import Container from "@mui/material/Container";

import { Link, useNavigate } from "react-router-dom";

const NavBar = ({}) => {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  return (
    // <Box sx={{ width: 100% }}>
    <Container fixed>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          className="nav-icon"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
        />

        <BottomNavigationAction
          className="nav-icon"
          //   label="Add Post"
          icon={<AddPhotoAlternateIcon />}
          onClick={() => navigate("/new_post")}
        />

        <BottomNavigationAction
          className="nav-icon"
          //   label="Nearby"
          icon={
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />
          }
          onClick={() => navigate("/profile")}
        />
      </BottomNavigation>
      {/* </Box> */}
    </Container>
  );
};

export default NavBar;
