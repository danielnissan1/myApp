import React, { FC, useEffect, useState } from "react";
import Post from "../components/Posts/post";
import { IPost, IUser } from "../types/types";
import Box from "@mui/material/Box";
import axios from "axios";
import { userAtom } from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { getPosts } from "../services/postsService";

interface Props {}

// const user: IUser = {
//   id: 1,
//   username: "Kermit",
//   avatar:
//     "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
// };

const Feed = ({}: Props) => {
  const user = useRecoilValue(userAtom);

  const [allposts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    console.log("connected user:", user);

    const fetchPosts = async () => {
      setPosts(await getPosts());
    };
    fetchPosts();
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
