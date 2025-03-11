import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationIcon from "@mui/icons-material/LocationOn";
import PriceIcon from "@mui/icons-material/AttachMoney";
import EditableText from "../Inputs/editableText";
// import { deletePost, updatePost } from "../../services/postsService";
import { IPost } from "../../types/types";
import { useUploadImage } from "../../hooks/useUploadImage";
import { usePosts } from "../../hooks/usePosts";

interface postProps {
  price: number;
  isSold: boolean;
  location: string;
  content: string;
  date: Date;
  imgSrc: string;
  id: string | undefined;
  post: IPost;
  countPosts: number;
  setCountPosts: React.Dispatch<React.SetStateAction<number>>;
}

const ProfilePost = ({
  price,
  content,
  location,
  isSold,
  imgSrc,
  date,
  id,
  post,
  countPosts,
  setCountPosts,
}: postProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newSoldStatus, setIsSoldStatus] = useState(isSold);
  const [newLocation, setNewLocation] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newContent, setNewContent] = useState();
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUploadImage();
  const { deletePost, updatePost } = usePosts();

  const deleteById = () => {
    id && deletePost(id);
    setCountPosts(countPosts - 1);
  };

  const updateById = async () => {
    newLocation && (post.location = newLocation);
    newPrice && (post.price = Number(newPrice));
    newContent && (post.content = newContent);
    post.isSold = newSoldStatus;
    if (newImage) {
      const newImgUrl = await uploadImage(newImage, "http://localhost:80/file");
      post.imgSrc = newImgUrl;
    }

    id && updatePost(id, post);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  return (
    <Card sx={{ height: "22rem", width: "27rem", margin: "1rem" }}>
      <CardActions
        sx={{
          direction: "rtl",
          display: "flex",
          justifyContent: "space-between",
          pb: "0rem",
          pt: "01.rem",
        }}
      >
        <Box>
          <IconButton onClick={deleteById}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editMode && updateById();
              setEditMode(!editMode);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        {editMode && (
          <Button
            sx={{
              borderRadius: "1rem",
              border: newSoldStatus ? "" : "1px solid black",
              backgroundColor: newSoldStatus ? "red" : "",
              color: newSoldStatus ? "white" : "black",
            }}
            onClick={() => {
              setIsSoldStatus(!newSoldStatus);
            }}
          >
            {newSoldStatus ? "SOLD" : "Mark as sold"}
          </Button>
        )}
      </CardActions>
      <CardContent sx={{ pt: "0rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <LocationIcon />
            <EditableText
              width="20rem"
              textAlignOnDisplay="left"
              defaultText={location}
              editMode={editMode}
              setValue={setNewLocation}
            ></EditableText>
          </Box>
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
                src={previewImage || imgSrc}
                style={{ height: "12rem", cursor: "pointer" }}
                onClick={() =>
                  inputFileRef.current && inputFileRef.current.click()
                }
              />
            </div>
          ) : (
            <img src={previewImage || imgSrc} style={{ height: "12rem" }}></img>
          )}
          <Box pt={"0.5rem"}>
            <PriceIcon />
            <EditableText
              width="20rem"
              textAlignOnDisplay="left"
              defaultText={String(price)}
              editMode={editMode}
              setValue={setNewPrice}
            ></EditableText>
          </Box>
          <Box sx={{ ml: "1.5rem" }}>
            <EditableText
              width="20rem"
              textAlignOnDisplay="left"
              defaultText={content}
              editMode={editMode}
              setValue={setNewContent}
            ></EditableText>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfilePost;
