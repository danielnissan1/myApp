import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./pages/feed";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";
import PostPage from "./pages/postPage";
import Login from "./components/Login/login";
import Register from "./components/Login/register";
import "./App.css";
import axios from "axios";
import { RoutesValues } from "./consts/routes";

const baseURL = "http://localhost:3001";
export const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export interface IUser {
  id: number;
  userName: string;
  avatar: string;
}
export interface IPost {
  id: number;
  owner: IUser;
  likes: IUser[];
  imgSrc: string;
  date: Date;
  isSold: boolean;
}
const user: IUser = {
  id: 1,
  userName: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};
const post: IPost = {
  id: 1,
  date: new Date(),
  imgSrc:
    "https://i.pinimg.com/474x/ed/69/55/ed6955fe79e587d6f648f82c2e445dd4.jpg",
  likes: [user],
  owner: user,
  isSold: true,
};

function App() {
  return (
    <Routes>
      <Route path={RoutesValues.LOGIN} element={<Login />}></Route>
      <Route path={RoutesValues.REGISTER} element={<Register />}></Route>
      <Route path={RoutesValues.HOME} element={<Feed />}></Route>
      <Route path={RoutesValues.POSTS} element={<PostPage />}></Route>
      <Route path={RoutesValues.PROFILE} element={<Profile />}></Route>
      <Route path={RoutesValues.NEW_POST} element={<NewPost />}></Route>
    </Routes>
  );
}

export default App;
