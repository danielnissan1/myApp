import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { RoutesValues } from "../../consts/routes";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../types/types";
import picturePlaceHolder from "../../assets/pic_placeholder.jpg";
import "./newpost.css";
import { FieldValues, useForm } from "react-hook-form";
// import { createPost } from "../../services/postsService";
import { useRecoilValue } from "recoil";
import { defaultUser, userAtom } from "../../atoms/userAtom";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { usePosts } from "../../hooks/usePosts";

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
  const { uploadImage } = useUploadImage();
  const { createPost } = usePosts();
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  useEffect(() => {
    if (curruser === defaultUser) {
      navigate(RoutesValues.LOGIN);
      setRefreshToken("");
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
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setValue("img", file);
    }
  };

  const getPriceRecommendation = async (itemDescription: string) => {
    try {
      const response = await fetch(`/priceRec/getPriceRecommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemDescription }),
      });
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
          paddingBottom: "60px",
          width: "80vw",
          textAlign: "center",
          mt: "20px",
          justifyContent: "space-between",
        }}
      >
        <div className="image-part">
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
              style={{ height: "45vh", width: "45vh", cursor: "pointer" }}
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
