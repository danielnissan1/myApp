import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { RoutesValues } from "../consts/routes";
import { instance } from "../App";

export const useAuth = () => {
  const setUser = useSetRecoilState(userAtom);
  const [, setRefreshToken] = useLocalStorage("refreshToken", "accessToken");
  const navigate = useNavigate();

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const res = await googleSignIn(credentialResponse);
      console.log("res", res);

      if (res.refreshToken) {
        setRefreshToken(res.refreshToken);
      } else {
        console.error("Refresh token is undefined");
      }

      setUser(res); // ✅ Updates the user state
      navigate(RoutesValues.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLoginError = () => {
    console.log("Error");
  };

  return { onGoogleLoginSuccess, onGoogleLoginError };
};

export const googleSignIn = async (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("googleSignIn...");
    instance
      .post(`/auth/google`, credentialResponse)
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
