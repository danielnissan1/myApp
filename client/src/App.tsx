import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Feed from "./pages/feed";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";
import Login from "./components/Login/login";
import Register from "./components/Login/Register/register";
import "./App.css";
import axios from "axios";
import { RoutesValues } from "./consts/routes";
import Layout from "./components/Layout/layout";
import { RecoilRoot, useRecoilValue } from "recoil";

const baseURL = "http://localhost:3001";
export const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path={RoutesValues.LOGIN} element={<Login />}></Route>
        <Route path={RoutesValues.REGISTER} element={<Register />}></Route>

        <Route element={<Layout />}>
          <Route path={RoutesValues.HOME} element={<Feed />}></Route>
          <Route path={RoutesValues.PROFILE} element={<Profile />}></Route>
          <Route path={RoutesValues.NEW_POST} element={<NewPost />}></Route>
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
