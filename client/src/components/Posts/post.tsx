import React, { useContext, useEffect, useState } from "react";
import { IComment, IPost } from "../../types/types";
import "./post.css";
import { UserContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import axios from "axios";
import { Comments } from "./comments";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
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

  useEffect(() => {
    const getComments = () => {
      axios
        .get(`http://localhost:3001/comments/${post._id}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("CORS Error:", err));
    };
    getComments();
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
        <div style={{ minWidth: "fit-content" }}>
          <FontAwesomeIcon
            icon={faComment}
            style={{ padding: "0 5px" }}
            className="comment-icon"
            onClick={(e) => {
              e.stopPropagation();
              setOpenComments((prev) => !prev);
            }}
          />
          <Typography variant="caption">{comments.length}</Typography>
        </div>

        <div style={{ minWidth: "fit-content" }}>
          <IconButton onClick={handleLikeToggle} color="error">
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <Typography variant="caption">{likes}</Typography>
        </div>
      </div>
      <div style={{ minWidth: "fit-content" }}>
        {openComments && (
          <Comments
            comments={comments}
            postId={post._id}
            opened={openComments}
            setOpened={setOpenComments}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
