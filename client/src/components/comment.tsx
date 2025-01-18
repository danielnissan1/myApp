"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
// import { useAuth } from '@/hooks/useAuth'
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useAnimation } from "framer-motion";
import styles from "./CommentsDialog.module.css";

interface Comment {
  id: string;
  username: string;
  content: string;
  avatar?: string;
}

interface CommentsDialogProps {
  postId: string;
  children: ReactNode;
}

export function CommentsDialog({ postId, children }: CommentsDialogProps) {
  //   const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const constraintsRef = useRef(null);

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
        username: user?.username || "Anonymous",
        content: newComment,
        avatar: user?.avatar || "/placeholder.svg?height=40&width=40",
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 50) {
      setIsOpen(false);
    } else {
      controls.start({ y: 0 });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      controls.start({ y: 0 });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
        <Dialog.Content className={styles.content} ref={constraintsRef}>
          <motion.div
            drag="y"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="h-full"
          >
            <div className={styles.commentsContainer}>
              <div className={styles.dragHandle} />
              <h2 className={styles.title}>Comments</h2>
              <div className={styles.commentsList}>
                {comments.map((comment) => (
                  <div key={comment.id} className={styles.commentCard}>
                    <div className={styles.commentHeader}>
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.username}
                        width={40}
                        height={40}
                        className={styles.commentAvatar}
                      />
                      <div className={styles.commentUsername}>
                        {comment.username}
                      </div>
                    </div>
                    <p className={styles.commentContent}>{comment.content}</p>
                  </div>
                ))}
              </div>
              {user && (
                <form
                  onSubmit={handleSubmitComment}
                  className={styles.commentForm}
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className={styles.commentInput}
                  />
                  <button type="submit" className={styles.submitButton}>
                    Post Comment
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
