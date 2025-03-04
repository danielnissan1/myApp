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

  //Gets an array and slice it to an array of arrays that each sub-array contains 3 posts
  const chunkPosts = (posts: IPost[]) => {
    const result = [];
    for (let i = 0; i < posts.length; i += 3) {
      result.push(posts.slice(i, i + 3));
    }
    return result;
  };

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
        mb={"0.5rem"}
      >
        <Typography>userEmail@gmail.com</Typography>
      </Box>
      {chunkPosts(
        Array(6)
          .fill(posts)
          .flat()
      ).map((chunk, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {chunk.map((post) => {
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
        </div>
      ))}
    </Box>
  );
};

export default Profile;
