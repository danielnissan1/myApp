import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { RoutesValues } from "../consts/routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IPost } from "../App";
import picturePlaceHolder from "../assets/pic_placeholder.jpg";
import { useForm } from "react-hook-form";
import "./newPost.css";

interface FormData {
  img: FileList;
  description: string;
  location: string;
  price: number;
}

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data: FormData) => {
    if (!data.img || !data.description || !data.location || !data.price) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const newPost: IPost = {
      imgSrc: previewImage || "",
      content: data.description,
      location: data.location,
      price: Number(data.price),
      isSold: false,
      date: new Date(),
      owner: { avatar: "", id: 123456, username: "ppp" },
    };

    try {
      await axios.post(`http://localhost:3001/posts`, newPost);
      navigate(RoutesValues.HOME);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        gap: "25px",
        paddingBottom: "60px", // Add padding to the bottom
      }}
    >
      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputFileRef}
        className="inputfile"
        style={{ visibility: "hidden" }}
      />
      <img
        src={previewImage || picturePlaceHolder}
        alt="Uploaded"
        className="uploaded-image"
        style={{ width: "200px", height: "200px", cursor: "pointer" }}
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
      />

      {/* Description */}
      <TextField
        sx={{ width: "100%", maxWidth: "400px" }}
        label="Description"
      />
      {/* Location */}
      <TextField
        sx={{ width: "100%", maxWidth: "400px" }}
        label="Location"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
        }}
      />

      {/* Price */}
      <TextField
        sx={{ width: "100%", maxWidth: "400px" }}
        label="Price"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">₪</InputAdornment>,
        }}
      />

      {/* Submit Button - Always Visible */}
      <Button
        sx={{
          mt: "20px",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgb(235, 226, 226)",
          color: "white",
          position: "sticky",
          bottom: "20px",
        }}
        type="submit"
        className="post-button"
      >
        Post
      </Button>
    </Box>
    // </form>
  );
};

export default NewPost;
