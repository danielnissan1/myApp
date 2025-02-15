import React, { FC, useEffect, useState } from "react";
import Post from "../components/post";
import { IPost, IUser } from "../App";
import Box from "@mui/material/Box";
import TopBar from "../components/Bars/topbar";
import BottomNavbar from "../components/Bars/bottomNavbar";

interface Props {}

const user: IUser = {
  id: 1,
  userName: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};
const posts: IPost[] = [
  {
    id: 1,
    date: new Date(),
    imgSrc:
      "https://i.pinimg.com/474x/ed/69/55/ed6955fe79e587d6f648f82c2e445dd4.jpg",
    likes: [user],
    owner: user,
    isSold: true,
  },
  {
    id: 2,
    date: new Date(),
    imgSrc:
      "https://i.pinimg.com/474x/ed/69/55/ed6955fe79e587d6f648f82c2e445dd4.jpg",
    likes: [user],
    owner: user,
    isSold: true,
  },
  {
    id: 3,
    date: new Date(),
    imgSrc:
      "https://i.pinimg.com/474x/ed/69/55/ed6955fe79e587d6f648f82c2e445dd4.jpg",
    likes: [user],
    owner: user,
    isSold: true,
  },
];

const Feed = ({}: Props) => {
  const [allposts, setPosts] = useState<IPost[]>(posts);

  useEffect(() => console.log("here"), []);

  useEffect(() => {
    const getPosts = () => {
      // instance
      //   .get("/posts")
      //   .then((res: any) => {
      //     // handle success
      //     // console.log(res.data);
      //     setPosts(res.data);
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
        <Post key={currPost.id} post={currPost} />
      ))}
      <BottomNavbar />
    </Box>
  );
};

export default Feed;
