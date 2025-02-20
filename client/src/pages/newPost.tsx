import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import "./newpost.css";
import NavBar from "../components/Bars/bottomNavbar";
import TopBar from "../components/Bars/topbar";
import { VisibilityOff, Visibility, LocationOn } from "@mui/icons-material";
import { RoutesValues } from "../consts/routes";
import login from "./login";
import { useNavigate } from "react-router-dom";

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!image || !description || !location || !price) {
      alert("Please fill all fields and upload an image");
      return;
    }
    const newPost = { image, description, location, price };
    console.log("New Post Submitted:", newPost);

    navigate(RoutesValues.HOME);
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="inputfile"
        ></input>
        <TextField
          sx={{ margin: "20px", width: "100%" }}
          label="Description"
        ></TextField>
        <TextField
          sx={{ margin: "20px", width: "100%" }}
          label="Location"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <TextField
          sx={{ margin: "20px", width: "100%" }}
          label="Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">₪</InputAdornment>,
          }}
        />
      </Box>
      <Button
        sx={{
          mt: "30px",
          width: "450px",
          backgroundColor: "#ebe2e2",
          color: "black",
          "&:hover": {
            backgroundColor: "rgb(229, 212, 212)",
          },
        }}
        onClick={login}
      >
        Post
      </Button>
      <NavBar />
    </>
  );
};

export default NewPost;
