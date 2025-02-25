import React, { FC, useEffect, useState } from "react";
import Post from "../components/Posts/post";
import { IPost, IUser } from "../types/types";
import Box from "@mui/material/Box";
import axios from "axios";

interface Props {}

const user: IUser = {
  id: 1,
  username: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};

const Feed = ({}: Props) => {
  const [allposts, setPosts] = useState<IPost[]>([]);

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
      {allposts.map((currPost) => (
        <Post key={currPost._id} post={currPost} />
      ))}
    </Box>
  );
};

export default Feed;
