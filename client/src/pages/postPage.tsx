// import { useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { Box, AppBar, Toolbar, Typography } from "@mui/material";
// import { Comments } from "../components/Posts/comments";
// import { IPost } from "../types/types";
// import Post from "../components/Posts/post";

// const PostPage = () => {
//   const location = useLocation();
//   const [post, setPost] = useState<IPost | null>(null);
//   const [openComments, setOpenComments] = useState<boolean>(false);

//   useEffect(() => {
//     if (location.state) {
//       // Assuming location.state contains the data you passed
//       const data = location.state;
//       setPost(data.post || null);
//     }
//   }, [location.state]);

//   return (
//     <div className="Home">
//       {post && (
//         <div>
//           <Post post={post} />
//           {post._id && (
//             <Comments
//               comments={[]}
//               postId={post._id.toString()}
//               opened={openComments}
//               setOpened={setOpenComments}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostPage;
