import React, { FC, useEffect, useState } from "react";
import Post from "../components/Posts/post";
import { IPost, IUser } from "../types/types";
import Box from "@mui/material/Box";
import axios from "axios";
import { defaultUser, userAtom } from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { getPosts } from "../services/postsService";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../consts/routes";
import PaginationControls from "../components/paginationControls";
import useGetPostsPagination from "../hooks/useGetPostPagination";
import { CircularProgress } from "@mui/material";
import { log } from "console";

interface Props {}

const Feed = ({}: Props) => {
  const user = useRecoilValue(userAtom);

  const [allposts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  const navigate = useNavigate();

  const { data, isLoading } = useGetPostsPagination(page);
  const totalPages = data ? data.totalPages : 1;
  useEffect(() => {
    console.log("data:", data);
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  useEffect(() => {
    if (user === defaultUser) {
      navigate(RoutesValues.LOGIN); // Redirect to login page if user is not set
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log("connected user:", user);

    const fetchPosts = async () => {
      // setPosts(await getPosts());
    };
    fetchPosts();
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* {allposts.map((currPost) => (
        <Post key={currPost._id} post={currPost} />
      ))} */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </Box>
  );
};

export default Feed;
