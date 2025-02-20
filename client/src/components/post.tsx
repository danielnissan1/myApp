import React, { useContext, useState } from "react";
import { IPost } from "../App";
import "./post.css";
import { UserContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Comments } from "./comments";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [openComments, setOpenComments] = useState<boolean>(false);

  const postClick = () => navigate("/post", { state: { post } });

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
