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
// import { postNewPost } from "../services/postService";

interface Props {}
const NewPost = ({}: Props) => {
  const [postSrc, setPostSrc] = useState<string>("");
  const user = useContext(UserContext);

  // const postNewPost = () => {
  //   instance
  //     .post(`/posts/new_post`, {
  //       // user: user,
  //       imgSrc: postSrc,
  //     })
  //     .then((res: any) => {
  //       // handle success
  //       console.log(res.data);
  //     })
  //     .catch((error: any) => {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       // always executed
  //     });
  // };

  const newPostApp = () => {
    // postNewPost(postSrc).then(() => {});
  };
  const updateSrc = (newSrc: string) => {
    console.log(newSrc);
    setPostSrc(newSrc);
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
        label="Image URL"
        autoComplete="off"
        variant="filled"
        onChange={(e) => {
          updateSrc(e.target.value);
        }}
      />
      <Button onClick={newPostApp}>Post</Button>
    </div>
  );
};

export default NewPost;
