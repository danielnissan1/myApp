import React, { FC, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IPost, instance } from "../App";
import { UserContext } from "../context";
import Post from "../components/post";
import { Avatar, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";

interface Props {}

const Profile = ({}: Props) => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const userContext = useContext(UserContext);

  // useEffect(() => {
  //   // const getUserPosts = () => {
  //   //   instance
  //   //     .get(`/posts/userid`)
  //   //     .then((res: any) => {
  //   //       // handle success
  //   //       // console.log(res.data);
  //   //       setUserPosts(res.data);
  //   //     })
  //   //     .catch((error: any) => {
  //   //       // handle error
  //   //       console.log(error);
  //   //     })
  //   //     .finally(() => {
  //   //       // always executed
  //   //     });
  //   //   // console.log(posts);
  //   // };

  //   const getUserPostApp = () => {
  //     getUserPostApp();
  //   };
  //   getUserPostApp();
  // }, []);

  return (
    <Box>
      <Avatar
        alt={userContext.user.username}
        src={userContext.user.avatar}
        sx={{ width: 200, height: 200, marginTop: "1rem" }}
      ></Avatar>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"1rem"}
      >
        <Typography>Username</Typography>
        <Button>
          <Typography>Edit</Typography>
          <EditIcon />
        </Button>
      </Box>
      {/* <div className="prof"> */}

      {/* <div className="posts">
          {userPosts.map((currPost) => (
            <Post key={currPost._id} post={currPost} />
          ))}
        </div> */}
      {/* </div> */}
    </Box>
  );
};

export default Profile;
