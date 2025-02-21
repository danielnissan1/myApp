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
import Layout from "./components/Layout/layout";

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
  username: string;
  avatar: string;
}
export interface IPost {
  _id?: string;
  owner: IUser;
  imgSrc: string;
  date: Date;
  isSold: boolean;
  content: string;
  location: string;
  price: number;
}
const user: IUser = {
  id: 1,
  username: "Kermit",
  avatar:
    "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
};

function App() {
  return (
    <Routes>
      <Route path={RoutesValues.LOGIN} element={<Login />}></Route>
      <Route path={RoutesValues.REGISTER} element={<Register />}></Route>

      <Route element={<Layout />}>
        <Route path={RoutesValues.HOME} element={<Feed />}></Route>
        <Route path={RoutesValues.POSTS} element={<PostPage />}></Route>
        <Route path={RoutesValues.PROFILE} element={<Profile />}></Route>
        <Route path={RoutesValues.NEW_POST} element={<NewPost />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
