import React, { FC, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IPost, instance } from "../App";
import { UserContext } from "../context";
import Post from "../components/post";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CameraIcon from "@mui/icons-material/CameraAltOutlined";
import { colors } from "../consts/colors";

interface Props {}

const Profile = ({}: Props) => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const userContext = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  const editProfileImage = () => {
    //TODO
  };

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
      <Box sx={{ direction: "rtl", marginTop: "1.2rem", marginRight: "1rem" }}>
        <Button
          sx={{
            backgroundColor: "#ebe2e2",
            color: "black",
            width: "10rem",
            borderRadius: "10rem",
          }}
          onClick={() => setEditMode(!editMode)}
        >
          {!editMode && <EditIcon sx={{ fontSize: "1rem", ml: "0.3rem" }} />}
          {editMode ? "Finsh edit" : "Edit profile"}
        </Button>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        position={"relative"}
      >
        <Avatar
          alt={userContext.user.username}
          src={userContext.user.avatar}
          sx={{
            width: 200,
            height: 200,
            marginTop: "1rem",
          }}
        ></Avatar>
        {editMode && (
          <IconButton
            onClick={editProfileImage}
            sx={{
              backgroundColor: colors.BABY_PINK,
              position: "absolute",
              top: 170,
              left: 810,
            }}
          >
            <CameraIcon />
          </IconButton>
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"1rem"}
      >
        <TextField
          hiddenLabel
          defaultValue={"UserName"}
          disabled={!editMode}
          variant="standard"
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              color: "black",
              "-webkit-text-fill-color": "black",
              textAlign: "center",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid black", // Custom color for the bottom line (before focus)
            },
          }}
          InputProps={{
            disableUnderline: !editMode,
          }}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"0.3rem"}
      >
        <Typography>userEmail@gmail.com</Typography>
      </Box>
      {/* <div className="posts">
          {userPosts.map((currPost) => (
            <Post key={currPost._id} post={currPost} />
          ))}
        </div> */}
    </Box>
  );
};

export default Profile;
