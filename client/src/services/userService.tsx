import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/types";
import { apiClient } from "./api-client";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

export const googleSignIn = async (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("googleSignIn...");
    axios
      .post("http://localhost:3001/auth/google", credentialResponse)
      .then((res) => {
        console.log("googleSignIn response:", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.error("googleSignIn error:", err);
        reject(err);
      });
  });
};
