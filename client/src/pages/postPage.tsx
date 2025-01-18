import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Comments } from "../components/comments";
import { IPost } from "../App";
import Post from "../components/post";

const PostPage = () => {
  const location = useLocation();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (location.state) {
      // Assuming location.state contains the data you passed
      const data = location.state;
      setPost(data.post || null);
    }
  }, [location.state]);

  return (
    <div className="Home">
      {post && (
        <div>
          <Post post={post} />
          <Comments postId={post.id.toString()} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
