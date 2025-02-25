import React, { useContext, useEffect, useState } from "react";
import { IPost } from "../../types/types";
import "./post.css";
import { UserContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Comments } from "./comments";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import axios from "axios";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get(`http://localhost:3001/likes/${post._id}`)
        .then((res) => setLikes(res.data.length))
        .catch((err) => console.error("CORS Error:", err));
    };
    getPosts();
  }, []);

  const handleLikeToggle = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };
  console.log(post);

  return (
    <div className="card">
      <div className="location">
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
        <p className="title">{post.location}</p>
        {post.isSold && <span className="sold-badge">SOLD</span>}
      </div>
      <img className="post-img" src={post.imgSrc} alt="Post image" />
      <div className="owner-details">
        <div className="circle">
          <img
            className="owner-img"
            src={post.owner.avatar || "../assets/default-avatar.png"}
            alt="Owner avatar"
          />
        </div>
        <div className="text">
          <p className="owner-name">{post.owner.username}</p>
          <p className="post-text">{post.content}</p>
        </div>
        <p className="price">{post.price}₪</p>
        <FontAwesomeIcon
          icon={faComment}
          className="comment-icon"
          onClick={(e) => {
            e.stopPropagation();
            setOpenComments((prev) => !prev);
          }}
        />

        <div style={{ minWidth: "fit-content" }}>
          <IconButton onClick={handleLikeToggle} color="error">
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <Typography variant="caption">{likes}</Typography>
        </div>
      </div>
      {openComments && (
        <Comments
          postId={post._id}
          opened={openComments}
          setOpened={setOpenComments}
        />
      )}
    </div>
  );
};

export default Post;
