import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IPost } from "../types/types";
import { UserContext } from "../context";
import { Avatar, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CameraIcon from "@mui/icons-material/CameraAltOutlined";
import { colors } from "../consts/colors";
import EditableText from "../components/Inputs/editableText";
import { useProfile } from "../hooks/useProfile";
import ProfilePost from "../components/Posts/profilePost";

interface Props {}

const Profile = ({}: Props) => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const userContext = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const userId = "678812d5fe88031918cfc5fc";

  const { getUsersPosts, posts } = useProfile(userId);

  const editProfileImage = () => {
    //TODO
  };

  useEffect(() => {
    getUsersPosts();
  }, [userId]);

  console.log(posts);
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
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"1rem"}
      >
        <EditableText defaultText="username" editMode={editMode}></EditableText>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"0.3rem"}
      >
        <Typography>userEmail@gmail.com</Typography>
      </Box>
      {posts.map((post) => {
        return (
          <ProfilePost
            key={post._id}
            price={post.price}
            location={post.location}
            content={post.content}
            date={post.date}
            imgSrc={post.imgSrc}
            isSold={post.isSold}
          ></ProfilePost>
        );
      })}
    </Box>
  );
};

export default Profile;
