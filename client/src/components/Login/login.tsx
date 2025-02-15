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
import hangerImage from "/Users/noa/Desktop/Projects/Degree/webApplications/firstAssignment/myApp/client/src/assets/hanger.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  //   const handleMouseDownPassword = (
  //     event: React.MouseEvent<HTMLButtonElement>
  //   ) => {
  //     event.preventDefault();
  //   };

  //   const handleMouseUpPassword = (
  //     event: React.MouseEvent<HTMLButtonElement>
  //   ) => {
  //     event.preventDefault();
  //   };

  return (
    <FormControl>
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
                  //   onMouseDown={handleMouseDownPassword}
                  //   onMouseUp={handleMouseUpPassword}
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
      <Button sx={{ mt: "30px" }} variant="contained">
        Login
      </Button>
      <Box display="flex" justifyContent="center" alignItems="center" mt="5px">
        <Typography>Don't have an account?</Typography>
        <Button>Sign up</Button>
      </Box>
    </FormControl>
  );
};

export default Login;
