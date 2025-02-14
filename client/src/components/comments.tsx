import React, { useEffect, useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import "./comments.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface Comment {
  id: string;
  username: string;
  content: string;
  avatar?: string;
}

interface CommentsDialogProps {
  postId: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Comments({ postId, opened, setOpened }: CommentsDialogProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const dummyComments = [
      {
        id: "1",
        username: "user2",
        content: "Is this still available?",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        username: "user3",
        content: "Great condition!",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ];
    setComments(dummyComments);
  }, [postId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: String(comments.length + 1),
        username: "Anonymous",
        content: newComment,
        avatar: "/placeholder.svg?height=40&width=40",
      };
      setComments([...comments, newCommentObj]);
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
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <img
                  src={comment.avatar || "/placeholder.svg"}
                  alt={comment.username}
                  width={40}
                  height={40}
                  className="comment-avatar"
                />
                <div className="comment-username">{comment.username}</div>
              </div>
              <p className="comment-content">{comment.content}</p>
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
