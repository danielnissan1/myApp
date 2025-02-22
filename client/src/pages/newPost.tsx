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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setValue("img", event.target.files);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          gap: "5px",
          paddingBottom: "60px", // Add padding to the bottom
        }}
      >
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          {...register("img", { required: "Image is required" })}
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
        />
        <Box sx={{ height: "20px" }}>
          {errors.img && <p className="error-message">{errors.img.message}</p>}
        </Box>

        {/* Description */}
        <TextField
          sx={{ width: "100%", maxWidth: "400px" }}
          label="Description"
          {...register("description", { required: "Description is required" })}
        />
        <Box sx={{ height: "20px" }}>
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </Box>

        {/* Location */}
        <TextField
          sx={{ width: "100%", maxWidth: "400px" }}
          label="Location"
          {...register("location", { required: "Location is required" })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ height: "20px" }}>
          {errors.location && (
            <p className="error-message">{errors.location.message}</p>
          )}
        </Box>

        {/* Price */}
        <TextField
          sx={{ width: "100%", maxWidth: "400px" }}
          label="Price"
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          InputProps={{
            startAdornment: <InputAdornment position="start">₪</InputAdornment>,
          }}
        />
        <Box sx={{ height: "20px" }}>
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </Box>

        {/* Submit Button - Always Visible */}
        <Button
          sx={{
            mt: "20px",
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
            position: "sticky",
            bottom: "20px",
          }}
          type="submit"
          className="post-button"
        >
          Post
        </Button>
      </Box>
    </form>
  );
};

export default NewPost;
