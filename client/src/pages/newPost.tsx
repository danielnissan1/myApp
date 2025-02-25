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
import { IPost } from "../types/types";
import picturePlaceHolder from "../assets/pic_placeholder.jpg";
// import "./newPost.css";
import { apiClient } from "../services/api-client";
import { Field, FieldValues, useForm } from "react-hook-form";

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
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  // const imgRef = useRef<HTMLImageElement>(null);
  // const descriptionRef = useRef<HTMLInputElement>(null);
  // const locationRef = useRef<HTMLInputElement>(null);
  // const priceRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState } = useForm<FormData>();

  const [post, setPost] = useState<IPost>({
    _id: "",
    imgSrc: "",
    content: "",
    location: "",
    price: 0,
    isSold: false,
    date: new Date(),
    owner: { avatar: "", id: 1, username: "" },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImg = (file: File) => {
    console.log("uploadImg");
    console.log(file);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      apiClient
        .post("file/file?file=123.jpeg", formData, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        })
        .then((res) => {
          console.log(res);
          const url = res.data.url;
          setImgSrc(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const newPost: IPost;

  const onSubmit = async (data: FieldValues) => {
    // const data = {
    //   description: "test",
    //   location: "test",
    //   price: 100,
    // };

    console.log(data);

    // if (imgRef.current) {
    //   newPost.imgSrc = imgRef.current.src;
    // }
    // if (descriptionRef.current) {
    //   newPost.content = descriptionRef.current.value;
    // }
    // if (locationRef.current) {
    //   newPost.location = locationRef.current.value;
    // }
    // if (priceRef.current) {
    //   newPost.price = Number(priceRef.current.value);
    // }

    // const newPost: IPost = {
    //   imgSrc: previewImage || "",
    //   content: data.description,
    //   location: data.location,
    //   price: Number(data.price),
    //   isSold: false,
    //   date: new Date(),
    //   owner: { avatar: "", id: 123456, username: "ppp" },
    // };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          minHeight: "100vh",
          gap: "25px",
          paddingBottom: "60px", // Add padding to the bottom
        }}
      >
        {/* Image Upload */}
        <div>
          <input
            {...register("img", { required: true })}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={inputFileRef}
            className="inputfile"
            style={{ display: "none" }}
          />
          <img
            src={previewImage || picturePlaceHolder}
            alt="Uploaded"
            className="uploaded-image"
            style={{ height: "45vh", width: "22vw", cursor: "pointer" }}
            onClick={() => inputFileRef.current && inputFileRef.current.click()}
          />
          {formState.errors.img && formState.errors.img.type === "required" && (
            <p className="text-danger">Image is required</p>
          )}
        </div>
        <div>
          {/* Description */}
          <TextField
            className="input-field"
            {...register("description", { required: true })}
            sx={{ width: "100%", maxWidth: "400px" }}
            label="Description"
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            // ref={descriptionRef}
          />
          {formState.errors.description &&
            formState.errors.description.type === "required" && (
              <p className="text-danger">Description is required</p>
            )}
        </div>
        {/* Location */}
        <div>
          <TextField
            className="input-field"
            {...register("location", { required: true })}
            sx={{ width: "100%", maxWidth: "400px" }}
            label="Location"
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            // ref={locationRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
          {formState.errors.location &&
            formState.errors.location.type === "required" && (
              <p className="text-danger">Location is required</p>
            )}
        </div>
        <div>
          {/* Price */}
          <TextField
            className="input-field"
            {...register("price", { required: true })}
            sx={{ width: "100%", maxWidth: "400px" }}
            label="Price"
            type="number"
            onChange={(e) =>
              setPost({ ...post, price: Number(e.target.value) })
            }
            // ref={priceRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₪</InputAdornment>
              ),
            }}
          />
          {formState.errors.price &&
            formState.errors.price.type === "required" && (
              <p className="text-danger">Price is required</p>
            )}
        </div>
        {/* Submit Button - Always Visible */}
        <Button
          sx={{
            mt: "20px",
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgb(235, 226, 226)",
            color: "black",
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
