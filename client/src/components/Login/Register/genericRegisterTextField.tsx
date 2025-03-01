import { AccountCircle } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface props {}

//TODO?
const GenericRegisterTextField = () => {
  return (
    <TextField
    //   fullWidth
    //   sx={{ margin: "20px", width: "400px" }}
    //   label="username"
    //   {...register("username", { required: true, minLength: 9 })}
    //   required={true}
    //   error={!!errors.username}
    //   helperText={errors.username ? errors.username.message : ""}
    //   InputProps={{
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <AccountCircle />
    //       </InputAdornment>
    //     ),
    //   }}
    //   variant="standard"
    ></TextField>
  );
};

export default GenericRegisterTextField;
