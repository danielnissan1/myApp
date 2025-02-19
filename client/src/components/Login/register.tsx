import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { AccountCircle, Email, Home, Lock, Phone } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../../consts/routes";
import hangerImage from "/Users/noa/Desktop/Projects/Degree/webApplications/firstAssignment/myApp/client/src/assets/hanger.jpg";
import axios from "axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const schema = z.object({
  // username: z.string().refine((value) => /^[A-Z]/.test(value), {
  //   message: "Username must start with a capital letter",
  // }),
  password: z
    .string()
    .min(5, "Password has to be at least 5 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one capital letter, one andlowcase letter and numbers"
    ),
  email: z.string().email("Please enter a valid email address"),
  // phoneNumber: z
  //   .string()
  //   .length(10, "Please enter a valid phone number")
  //   .startsWith("05", "Please enter a valid phone number"),
  // address: z.string(),
});
type formData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSignUp = (data: FieldValues) => {
    axios
      .post("http://localhost:3001", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate(RoutesValues.HOME);
  };

  const onGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
  };

  const onGoogleLoginError = () => {
    console.log("Error");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <FormControl
        fullWidth
        sx={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={hangerImage} width={"150px"} />
        <form onSubmit={handleSubmit(onSignUp)}>
          {/* <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px"  }}
            label="username"
            {...register("username", { required: true, minLength: 9 })}
            required={true}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField> */}
          <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px" }}
            label="password"
            {...register("password", { required: true })}
            required={true}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField>
          <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px" }}
            label="email"
            {...register("email")}
            required={true}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField>
          {/* <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px"  }}
            label="phone number"
            {...register("phoneNumber")}
            required={true}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField> */}
          {/* <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px"  }}
            label="address"
            {...register("address")}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField> */}
          <Box display="flex" justifyContent="center" mt="10px">
            <Button
              type="submit"
              sx={{
                width: "400px",
                mt: "10px",
                backgroundColor: "#ebe2e2",
                color: "black",
                margin: "0 auto",
                "&:hover": {
                  backgroundColor: "rgb(229, 212, 212)",
                },
              }}
            >
              sign up
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" mt="10px">
            <GoogleLogin
              width={"400px"}
              onSuccess={onGoogleLoginSuccess}
              onError={onGoogleLoginError}
            ></GoogleLogin>
          </Box>
        </form>
      </FormControl>
    </Box>
  );
};
export default Register;
