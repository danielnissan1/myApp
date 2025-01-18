import React, { FC, useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IPost, instance } from "../App";
import { UserContext } from "../context";
import Button from "@mui/material/Button";
import { off } from "process";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/userService";

interface Props {}
const Login = ({}: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  // const creatPost = () => {
  //   let newPost: IPost;
  //   newPost = { imgSrc: "", owner: user };
  // };

  useEffect(() => {}, []);
  // const loginUser = () => {
  //   instance
  //     .post(`/users/login`, {
  //       username: username,
  //       password: password,
  //     })
  //     .then((res: any) => {
  //       // handle success
  //       if (res.data) {
  //         changeUser(res.data);
  //         navigate("/");
  //       } else {
  //         alert("your details are incorrect");
  //       }
  //       console.log(res.data);

  //       // setIsLoggedIn(true);
  //       // setUserPosts(res.data);
  //     })
  //     .catch((error: any) => {
  //       // handle error
  //       console.log(error);
  //       // setIsLoggedIn(false);
  //     })
  //     .finally(() => {
  //       // always executed
  //     });
  //   // console.log(posts);
  // };
  const loginUserApp = () => {
    // loginUser(username, password).then((data) => {
    //   if (data) {
    //     changeUser(data);
    //     navigate("/");
    //   } else {
    //     alert("your details are incorrect");
    //   }
    // });
  };
  // getUserPosts();
  const updateUsername = (username: string) => {
    console.log(username);
    setUsername(username);
  };
  const updatePassword = (password: string) => {
    console.log(password);
    setPassword(password);
  };

  return (
    <div className="addPost">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              New Post
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <TextField
        id="filled-password-input"
        label="Username"
        autoComplete="off"
        variant="filled"
        onChange={(e) => {
          updateUsername(e.target.value);
        }}
      />
      <TextField
        id="filled-password-input"
        label="Password"
        autoComplete="off"
        variant="filled"
        type="password"
        onChange={(e) => {
          updatePassword(e.target.value);
        }}
      />
      <Button onClick={loginUserApp}>Login</Button>
    </div>
  );
};

export default Login;
