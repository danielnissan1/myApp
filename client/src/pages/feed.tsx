import React, { FC, useEffect, useState } from "react";
import Post from "../components/post";
import { IPost } from "../App";
import { instance } from "../App";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {}

const Feed = ({}: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => console.log("here"), []);

  useEffect(() => {
    // const getPosts = () => {
    //   instance
    //     .get("/posts")
    //     .then((res: any) => {
    //       // handle success
    //       // console.log(res.data);
    //       setPosts(res.data);
    //       // setPosts(res);
    //     })
    //     .catch((error: any) => {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       // always executed
    //     });
    //   // console.log(posts);
    // };
  }, []);

  return (
    <div className="Home">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Instagram
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {posts.map((currPost) => (
        <Post key={currPost.id} post={currPost} />
      ))}
    </div>
  );
};

export default Feed;
