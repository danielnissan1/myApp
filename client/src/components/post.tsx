import React, { FC, useContext, useEffect, useState } from "react";
import { IPost, IUser } from "../App";
import "./post.css";
import { instance } from "../App";
import { UserContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faLocationDot } from "@fortawesome/free-solid-svg-icons"; // Import the location icon
import { useNavigate } from "react-router-dom";
import { Comments } from "./comments";
import Sold from "./sold";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [openComments, setOpenComments] = useState<boolean>(false);

  const postClick = () => {
    navigate("/post", { state: { post } });
    console.log("post clicked");
  };
  //   const allTasks = tasks;

  return (
    <>
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
      {/* להעביר את כל הCSS לקובץ מוגדר */}
      <div className="card">
        <div className="location">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="title">Tel Aviv</p>
          <div className="sold-badge">
            <span className="sold-text">SOLD</span>
          </div>
        </div>
        <img
          className="post-img"
          src={post.imgSrc}
          alt=""
          // onClick={postClick}
        />
        <div className="owner-details">
          <div className="circle">
            <img className="owner-img" src={post.owner.avatar} alt="" />
          </div>
          <div className="text">
            <p className="owner-name">Kermit</p>
            <p className="post-text">my old pants</p>
          </div>
          <p className="price">20₪</p>
          <FontAwesomeIcon
            icon={faComment}
            onClick={() => setOpenComments((prev) => !prev)}
          />
        </div>
      </div>
      <Comments
        postId={post.id}
        opened={openComments}
        setOpened={setOpenComments}
      />
      {/* <Card sx={{ width: 345 }}>
        <CardHeader
          avatar={<Avatar alt={post.owner.userName} src={post.owner.avatar} />}
          //   action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title={post.owner.userName}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.imgSrc}
          alt="somthing went wrong :("
        />
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={onLike}
            color={isLiked ? "error" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography>{post.likes.length} likes</Typography>
        </CardActions>
      </Card> */}
    </>
  );
};

export default Post;
