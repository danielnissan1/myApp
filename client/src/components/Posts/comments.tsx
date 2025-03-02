import React, { useEffect, useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import "./comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { IUser, IComment } from "../../types/types";
// import { IUser } from "..../App";

interface CommentsDialogProps {
  comments: IComment[];
  postId?: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Comments({
  comments,
  postId,
  opened,
  setOpened,
}: CommentsDialogProps) {
  const [currComments, setCurrComments] = useState<IComment[]>(comments);
  const [newComment, setNewComment] = useState("");

  // useEffect(() => {
  //   const getComments = () => {
  //     axios
  //       .get("http://localhost:3001/comments/" + postId)
  //       .then((res) => setComments(res.data))
  //       .catch((err) => console.error("CORS Error:", err));
  //   };
  //   getComments();
  // }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: IComment = {
        id: String(comments.length + 1),
        owner: {
          username: "Anonymous",
          avatar: "/placeholder.svg",
          id: 12345,
        },
        comment: newComment,
        postId: postId || "",
      };
      setCurrComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      (event && (event as React.KeyboardEvent).key === "Tab") ||
      (event as React.KeyboardEvent).key === "Shift"
    ) {
      return;
    } else {
      setOpened((prev) => !prev);
    }
  };

  console.log(comments);

  return (
    <SwipeableDrawer
      classes={{ paper: "comments-containe" }}
      anchor="bottom"
      open={opened}
      onOpen={toggleDrawer}
      onClose={toggleDrawer}
      PaperProps={{ style: { borderRadius: "12px 12px 0 0" } }}
    >
      <div className="comments-content">
        {/* <h2 className="title">Comments</h2> */}
        <div className="comments-list">
          {currComments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img
                  src={comment.owner.avatar || "/placeholder.svg"}
                  alt={comment.owner.username}
                  width={40}
                  height={40}
                  className="comment-avatar"
                />
                <div className="comment-username">{comment.owner.username}</div>
              </div>
              <p className="comment-content">{comment.comment}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmitComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </form>
      </div>
    </SwipeableDrawer>
  );
}
