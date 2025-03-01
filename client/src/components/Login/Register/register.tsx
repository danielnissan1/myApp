import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { AccountCircle, Email, Home, Lock, Phone } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { schema, formData } from "./formData";
import { onSignUp } from "./register.module";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const [profileImage] = watch(["profileImage"]);
  const [profileImageSource, setProfileImageSource] = useState<string>();
  const photoRef: { current: HTMLInputElement | null } = { current: null };
  const { ref, ...rest } = register("profileImage", { required: true });

  useEffect(() => {
    if (profileImage && profileImage[0]) {
      const newUrl = URL.createObjectURL(profileImage[0]);
      if (newUrl != profileImageSource) {
        setProfileImageSource(newUrl);
      }
    }
  }, [profileImage]);

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
        <form onSubmit={handleSubmit(onSignUp)}>
          <IconButton
            onClick={() => photoRef.current && photoRef.current.click()}
            sx={{
              position: "absolute",
              top: 170,
              left: 810,
            }}
          >
            <AddPhotoIcon />
          </IconButton>
          {profileImageSource ? (
            <img
              src={profileImageSource}
              style={{
                height: "200px",
                width: "200px",
                marginTop: "1rem",
                borderRadius: "10rem",
              }}
            ></img>
          ) : (
            <Avatar
              sx={{
                width: 200,
                height: 200,
                marginTop: "1rem",
              }}
              src={profileImageSource}
            ></Avatar>
          )}
          <input
            {...rest}
            type="file"
            style={{ display: "none" }}
            ref={(e) => {
              ref(e);
              photoRef.current = e;
            }}
          />
          <TextField
            fullWidth
            sx={{ margin: "20px", width: "400px" }}
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
          ></TextField>
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
