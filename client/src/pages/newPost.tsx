import React, { useEffect, useRef, useState } from "react";
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
import "./newpost.css";
import { apiClient } from "../services/api-client";
import { Field, FieldValues, set, useForm } from "react-hook-form";
import { useAxiosPostRequests } from "../hooks/useAxiosPostRequests";
import { createPost } from "../services/postsService";
import { useRecoilValue } from "recoil";
import { defaultUser, userAtom } from "../atoms/userAtom";

interface FormData {
  img: File;
  description: string;
  location: string;
  price: number;
}

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const curruser = useRecoilValue(userAtom);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const { register, handleSubmit, formState, setValue } = useForm<FormData>();
  const { uploadImage } = useAxiosPostRequests();
  useEffect(() => {
    if (curruser === defaultUser) {
      navigate("/"); // Redirect to login page if user is not set
    }
  }, [curruser, navigate]);

  useEffect(() => {
    if (description === "") {
      setRecommendation(null);
    }
  }, [description]);

  const [post, setPost] = useState<IPost>({
    _id: "",
    imgSrc: "",
    content: "",
    location: "",
    price: 0,
    isSold: false,
    date: new Date(),
    owner: curruser,
    likes: [],
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files && event.target.files[0]) {
    //   const newUrl = URL.createObjectURL(event.target.files[0]);
    //   setValue("img", event.target.files[0]);
    //   newUrl;
    //   setImgUrl(newUrl);
    // }

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setValue("img", file); // Manually update react-hook-form with the selected file
    }
  };

  const getPriceRecommendation = async (itemDescription: string) => {
    try {
      const response = await fetch(
        "http://localhost:3001/priceRec/getPriceRecommendation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemDescription }),
        }
      );
      const data = await response.json();
      console.log(response);
      return data.recommendedPrice;
    } catch (error) {
      console.error("Error getting price:", error);
      return null;
    }
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const newPost: IPost = {
      // imgSrc: previewImage || "",
      imgSrc: imgUrl,
      content: data.description,
      location: data.location,
      price: Number(data.price),
      isSold: false,
      date: new Date(),
      owner: curruser,
      likes: [],
    };
    await createPost(newPost, data.img, uploadImage);

    navigate(RoutesValues.HOME);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          minHeight: "100vh",
          paddingBottom: "60px", // Add padding to the bottom
          width: "80vw",
          textAlign: "center",
          mt: "20px",
          justifyContent: "space-between",
        }}
      >
        <div className="image-part">
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
              style={{ height: "45vh", cursor: "pointer" }}
              onClick={() =>
                inputFileRef.current && inputFileRef.current.click()
              }
            />
            {formState.errors.img &&
              formState.errors.img.type === "required" && (
                <p className="text-danger">Image is required</p>
              )}
          </div>
        </div>
        <div className="details-part">
          <div className="input-area">
            {/* Description */}
            <TextField
              className="input-field"
              {...register("description", { required: true })}
              sx={{ width: "100%", maxWidth: "400px" }}
              label="Description"
              onChange={(e) => {
                setPost({ ...post, content: e.target.value });
                setDescription(e.target.value);
              }}
              // ref={descriptionRef}
            />
            {formState.errors.description &&
              formState.errors.description.type === "required" && (
                <p className="text-danger">Description is required</p>
              )}
          </div>
          {/* Location */}
          <div className="input-area">
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
          <div className="input-area">
            <div className="price-recommendation">
              {description && (
                <>
                  <Button
                    sx={{
                      // backgroundColor: "rgb(235, 226, 226)",
                      position: "sticky",
                      textDecoration: "underline",
                      color: "#a87a7a",
                      marginBottom: "8px",
                      fontSize: "12px",
                    }}
                    onClick={async () => {
                      const recommendedPrice = await getPriceRecommendation(
                        description
                      );
                      setRecommendation(recommendedPrice);
                    }}
                  >
                    Help me pick a price
                  </Button>

                  {recommendation && <p>{recommendation}</p>}
                </>
              )}
            </div>
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
        </div>
      </Box>
    </form>
  );
};

export default NewPost;
