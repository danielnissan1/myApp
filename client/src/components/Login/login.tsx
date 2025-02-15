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
import hangerImage from "/Users/noa/Desktop/Projects/Degree/webApplications/firstAssignment/myApp/client/src/assets/hanger.jpg";

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
        width={"450px"}
      >
        <img src={hangerImage} width={"300px"} />
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
