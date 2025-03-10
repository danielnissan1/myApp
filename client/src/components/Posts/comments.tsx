import React, { useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import "./comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { IComment } from "../../types/types";
import { createComment } from "../../services/commentsService";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";

interface CommentsDialogProps {
  comments: IComment[];
  postId?: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export function Comments({
  comments,
  postId,
  opened,
  setOpened,
  setComments,
}: CommentsDialogProps) {
  const curruser = useRecoilValue(userAtom);

  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: IComment = {
        id: String(comments.length + 1),
        owner: curruser,
        comment: newComment,
        postId: postId || "",
      };
      setComments([...comments, newCommentObj]);
      createComment(newCommentObj);
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
      PaperProps={{
        style: { borderRadius: "12px 12px 0 0", maxHeight: "75vh" },
      }}
    >
      <div className="comments-content">
        {/* <h2 className="title">Comments</h2> */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img
                  src={
                    comment.owner && comment.owner.avatar
                      ? comment.owner.avatar
                      : "/placeholder.svg"
                  }
                  alt={
                    comment.owner && comment.owner.username
                      ? comment.owner.username
                      : "Unknown user"
                  }
                  width={40}
                  height={40}
                  className="comment-avatar"
                />
                <div className="comment-username">
                  {comment.owner && comment.owner.username
                    ? comment.owner.username
                    : "Unknown user"}
                </div>
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
