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

const profilePost = () => {
  const [editMode, setEditMode] = useState(false);

  const deletePost = () => {};

  return (
    <Card sx={{ height: "20rem", width: "30rem" }}>
      <CardActions sx={{ direction: "rtl" }}>
        <IconButton onClick={deletePost}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => setEditMode(!editMode)}>
          <EditIcon />
        </IconButton>
        <Button>Mark as sold</Button>
      </CardActions>
      <CardContent>
        <Box sx={{ direction: "rtl" }}>
          <Box>
            <LocationIcon />
            <EditableText
              defaultText="Nir Yisrael hatamar 23"
              editMode={editMode}
            ></EditableText>
          </Box>
          <CardMedia></CardMedia>
          <Box>
            <PriceIcon />
            <EditableText defaultText="50" editMode={editMode}></EditableText>
          </Box>
          <Box>
            <EditableText
              defaultText="This is my text"
              editMode={editMode}
            ></EditableText>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default profilePost;
