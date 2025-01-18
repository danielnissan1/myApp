"use client";

import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from '@/hooks/useAuth'
import "./comments.css";

interface Comment {
  id: string;
  username: string;
  content: string;
  avatar?: string;
}

interface CommentsDialogProps {
  postId: string;
}

export function Comments({ postId }: CommentsDialogProps) {
  //   const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments from API
    // For now, we'll use dummy data
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

  return (
    <div className="comments-containe">
      <h2 className="title">Comments</h2>
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
          Post Comment
        </button>
      </form>
    </div>
  );
}
