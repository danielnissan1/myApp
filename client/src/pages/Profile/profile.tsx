import React, { useEffect, useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IPost } from "../../types/types";
import { Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { colors } from "../../consts/colors";
import EditableText from "../../components/Inputs/editableText";
import { useProfile } from "../../hooks/useProfile";
import ProfilePost from "../../components/Posts/profilePost";
import { defaultUser, userAtom } from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RoutesValues } from "../../consts/routes";
import picturePlaceHolder from "../../assets/pic_placeholder.jpg";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [newUsername, setNewUsername] = useState();
  const { getUsersPosts, posts, updateUser } = useProfile(String(user._id));
  const [countPosts, setCountPosts] = useState(posts.length || 0);
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUploadImage();

  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  useEffect(() => {
    if (user === defaultUser) {
      navigate(RoutesValues.LOGIN);
      setRefreshToken("");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUpload = async () => {
      if (newImage) {
        const newImgUrl = await uploadImage(
          newImage,
          `${process.env.BASE_URL}/file`
        );
        setUser({ ...user, avatar: newImgUrl });
      }
    };

    fetchUpload();
    newUsername && setUser({ ...user, username: newUsername });
  }, [newUsername, newImage]);

  useEffect(() => {
    getUsersPosts();
  }, [String(user._id), countPosts]);

  const handleUpdateProfile = () => {
    updateUser(String(user._id), user);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  // Gets an array and slice it to an array of arrays that each sub-array contains 3 posts
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
            backgroundColor: colors.BABY_PINK,
            color: "black",
            width: "10rem",
            borderRadius: "10rem",
          }}
          onClick={() => {
            editMode && handleUpdateProfile();
            setEditMode(!editMode);
          }}
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
        {editMode ? (
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              ref={inputFileRef}
            ></input>
            <img
              src={previewImage || picturePlaceHolder}
              style={{
                width: 200,
                height: 200,
                cursor: "pointer",
                borderRadius: "10rem",
                marginTop: "1rem",
              }}
              onClick={() =>
                inputFileRef.current && inputFileRef.current.click()
              }
            />
          </div>
        ) : (
          <Avatar
            alt={user.username}
            src={user.avatar}
            sx={{
              width: 200,
              height: 200,
              marginTop: "1rem",
            }}
          ></Avatar>
        )}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"1rem"}
      >
        <EditableText
          defaultText={user.username}
          editMode={editMode}
          setValue={setNewUsername}
        ></EditableText>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        marginTop={"0.3rem"}
        mb={"0.5rem"}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
      {chunkPosts(posts).map((chunk, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "flex-start" }}
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
                id={post._id}
                post={post}
                countPosts={countPosts}
                setCountPosts={setCountPosts}
              ></ProfilePost>
            );
          })}
        </div>
      ))}
    </Box>
  );
};

export default Profile;
