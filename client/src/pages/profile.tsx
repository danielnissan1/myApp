import React, { FC, useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IPost, instance } from "../App";
import { UserContext } from "../context";
import Post from "../components/post";
import Avatar from "@mui/material/Avatar";

interface Props {}

const Profile = ({}: Props) => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    // const getUserPosts = () => {
    //   instance
    //     .get(`/posts/userid`)
    //     .then((res: any) => {
    //       // handle success
    //       // console.log(res.data);
    //       setUserPosts(res.data);
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

    const getUserPostApp = () => {
      getUserPostApp();
    };
    getUserPostApp();
  }, []);

  return (
    <div className="Home">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userContext.user.userName}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="prof">
        <Avatar
          alt={userContext.user.userName}
          src={userContext.user.avatar}
          sx={{ width: 56, height: 56 }}
        />

        <div className="posts">
          {userPosts.map((currPost) => (
            <Post key={currPost._id} post={currPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
