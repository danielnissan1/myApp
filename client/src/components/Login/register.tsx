import React from "react";
import {
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

const schema = z.object({
  username: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: "Username must start with a capital letter",
  }),
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
  phoneNumber: z
    .string()
    .length(10, "Please enter a valid phone number")
    .startsWith("05", "Please enter a valid phone number"),
  address: z.string(),
});
type formData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  //TODO
  const onSignUp = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        width: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" mt="40px">
        Yad Shniya
      </Typography>
      <Typography>Let's sign up!</Typography>
      <form onSubmit={handleSubmit(onSignUp)}>
        <TextField
          fullWidth
          sx={{ margin: "20px" }}
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
          sx={{ margin: "20px" }}
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
          sx={{ margin: "20px" }}
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
        <TextField
          fullWidth
          sx={{ margin: "20px" }}
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
        ></TextField>
        <TextField
          fullWidth
          sx={{ margin: "20px" }}
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
        ></TextField>
        <Button
          variant="outlined"
          type="submit"
          sx={{ width: "150px", mt: "10px" }}
        >
          sign up
        </Button>
      </form>
    </FormControl>
  );
};
export default Register;
