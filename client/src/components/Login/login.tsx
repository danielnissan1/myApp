import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../../consts/routes";
import hangerImage from "../../assets/hanger.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    //TODO auth
    navigate(RoutesValues.HOME);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width={"28rem"}
      >
        <img src={hangerImage} width={"300rem"} />
        <TextField
          sx={{ margin: "20px", width: "100%" }}
          label="username"
        ></TextField>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Button
        sx={{
          mt: "30px",
          width: "450px",
          backgroundColor: "#ebe2e2",
          color: "black",
          "&:hover": {
            backgroundColor: "rgb(229, 212, 212)",
          },
        }}
        onClick={login}
      >
        Login
      </Button>
      <Box display="flex" justifyContent="center" alignItems="center" mt="5px">
        <Typography>Don't have an account?</Typography>
        <Button
          sx={{
            color: "rgb(192, 160, 160)",
            borderColor: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "transparent",
              transform: "scale(1.1)",
            },
          }}
          onClick={() => navigate(RoutesValues.REGISTER)}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
