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
import axios from "axios";
import { IPost } from "../App";

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image || !description || !location || !price) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const newPost: IPost = {
      imgSrc: URL.createObjectURL(image), // Convert File to URL string
      content: description,
      location,
      price: Number(price),
      isSold: false, // Default value
      date: new Date(), // Automatically set the date
      owner: { avatar: "", id: 123456, username: "ppp" },
    };

    try {
      const response = await axios.post(`http://localhost:3001/posts`, newPost);
      console.log("New Post Submitted:", response.data);

      navigate(RoutesValues.HOME);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };

  return (
    <>
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
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <TextField
          sx={{ margin: "20px", width: "100%" }}
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
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
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
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
        onClick={handleSubmit}
      >
        Post
      </Button>
    </>
  );
};

export default NewPost;
