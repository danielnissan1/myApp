import React, { useEffect, useState } from "react";
import { IComment, IPost } from "../../types/types";
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Comments } from "./comments";
// import { getComments } from "../../services/commentsService";
// import { likePost, unlikePost } from "../../services/postsService";
import { userAtom } from "../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { usePosts } from "../../hooks/usePosts";
import { useComments } from "../../hooks/useComments";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const navigate = useNavigate();
  const curruser = useRecoilValue(userAtom);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);
  const [likesNum, setLikesNum] = useState<number>(0);

  const { likePost, unlikePost } = usePosts();
  const { getComments } = useComments();

  useEffect(() => {
    if (post && post.likes) {
      setLikes(post.likes);
      setLikesNum(post.likes.length);
    }
  }, [post]);

  useEffect(() => {
    if (post && post.likes) {
      setLikes(post.likes);
      setLikesNum(post.likes.length);

      const isLiked = post.likes.includes(curruser._id.toString());
      setLiked(isLiked);
    }
  }, [post, curruser]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post._id) {
        setComments(await getComments(post._id));
      }
    };
    fetchComments();
  }, []);

  const handleLikeToggle = () => {
    if (post._id) {
      if (curruser._id) {
        const userId = curruser._id.toString();
        if (!liked) {
          likePost(post._id, userId);
        } else {
          unlikePost(post._id, userId);
        }
      } else {
        console.log("User is not logged in");
      }
    }
    setLikesNum(liked ? likesNum - 1 : likesNum + 1);
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

          <Typography variant="caption">{likesNum}</Typography>
        </div>
      </div>
      <div style={{ minWidth: "fit-content" }}>
        {openComments && (
          <Comments
            comments={comments}
            postId={post._id}
            opened={openComments}
            setOpened={setOpenComments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
