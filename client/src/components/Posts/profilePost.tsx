import React, { useState } from "react";
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
import { deletePost, updatePost } from "../../services/postsService";
import { IPost } from "../../types/types";

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

const profilePost = ({
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

  const [sold, setIsSold] = useState(isSold);
  const [newLocation, setNewLocation] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newContent, setNewContent] = useState();

  const deleteById = () => {
    id && deletePost(id);
    setCountPosts(countPosts - 1);
  };

  const updateById = () => {
    newLocation && (post.location = newLocation);
    newPrice && (post.price = Number(newPrice));
    newContent && (post.content = newContent);
    post.isSold = sold;
    console.log("post", post);
    console.log("sold?", sold);
    id && updatePost(id, post);
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
              border: sold ? "" : "1px solid black",
              backgroundColor: sold ? "red" : "",
              color: sold ? "white" : "black",
            }}
            onClick={() => {
              setIsSold(!sold);
            }}
          >
            {sold ? "SOLD" : "Mark as sold"}
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
          <img src={imgSrc} style={{ height: "12rem" }}></img>
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

export default profilePost;
