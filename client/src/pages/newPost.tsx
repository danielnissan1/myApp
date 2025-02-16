import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import "./newpost.css";

const NewPost = () => {
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
  };

  return (
    <div className="new-post-container">
      <Card className="new-post-card">
        <CardContent>
          <Typography variant="h5" className="title">
            Create a New Post
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="image-preview"
            />
          )}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
          <TextField
            label="Price (₪)"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input-field"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPost;
