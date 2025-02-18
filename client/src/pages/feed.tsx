import React, { FC, useEffect, useState } from "react";
import Post from "../components/post";
import { IPost, IUser } from "../App";
import Box from "@mui/material/Box";

import axios from "axios";
import TopBar from "../components/Bars/topbar";
import BottomNavbar from "../components/Bars/bottomNavbar";

interface Props {}

const user: IUser = {
  id: 1,
  userName: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};

const Feed = ({}: Props) => {
  const [allposts, setPosts] = useState<IPost[]>([]);

  useEffect(() => console.log("here"), []);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get("http://localhost:3001/posts")
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("CORS Error:", err));

      // instance
      //   .get("/posts")
      //   .then((res: any) => {
      //     // handle success
      //     // console.log(res.data);
      // setPosts(res.data);
      //     // setPosts(res);
      //   })
      //   .catch((error: any) => {
      //     // handle error
      //     console.log(error);
      //   })
      //   .finally(() => {
      //     // always executed
      //   });
      // // console.log(posts);
    };
    getPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TopBar />
      {allposts.map((currPost) => (
        <Post key={currPost._id} post={currPost} />
      ))}
      <BottomNavbar />
    </Box>
  );
};

export default Feed;
