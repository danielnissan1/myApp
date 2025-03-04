import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationIcon from "@mui/icons-material/LocationOn";
import PriceIcon from "@mui/icons-material/AttachMoney";
import EditableText from "../Inputs/editableText";

interface postProps {
  price: number;
  isSold: boolean;
  location: string;
  content: string;
  date: Date;
  imgSrc: string;
}

const profilePost = ({
  price,
  content,
  location,
  isSold,
  imgSrc,
  date,
}: postProps) => {
  const [editMode, setEditMode] = useState(false);
  const [sold, setIsSold] = useState(false);

  const deletePost = () => {};

  return (
    <Card sx={{ height: "18rem", width: "27rem", margin: "1rem" }}>
      <CardActions
        sx={{
          direction: "rtl",
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box>
          <IconButton onClick={deletePost}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setEditMode(!editMode)}>
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
      <CardContent>
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
            ></EditableText>
          </Box>
          {/* <CardMedia></CardMedia> */}
          <Box>
            <PriceIcon />
            <EditableText
              width="20rem"
              textAlignOnDisplay="left"
              defaultText={String(price)}
              editMode={editMode}
            ></EditableText>
          </Box>
          <Box sx={{ ml: "1.5rem" }}>
            <EditableText
              width="20rem"
              textAlignOnDisplay="left"
              defaultText={content}
              editMode={editMode}
            ></EditableText>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default profilePost;
