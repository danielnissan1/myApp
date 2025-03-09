import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/types";
import { apiClient } from "./api-client";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { RoutesValues } from "../consts/routes";

const [getRefreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
// const navigate = useNavigate();
// const setUser = useSetRecoilState(userAtom);

export const onGoogleLoginSuccess = async (
  credentialResponse: CredentialResponse
) => {
  console.log("ppppppp", credentialResponse);
  try {
    const res = await googleSignIn(credentialResponse);
    console.log("res", res);
  } catch (err) {
    console.log(err);
  }
};

export const onGoogleLoginError = () => {
  console.log("Error");
};

export const googleSignIn = async (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("googleSignIn...");
    axios
      .post("http://localhost:3001/auth/google", credentialResponse)
      .then((res) => {
        console.log("googleSignIn response:", res);
        resolve(res.data);
        // setUser(res.data);
        // navigate(RoutesValues.HOME);
      })
      .catch((err) => {
        console.error("googleSignIn error:", err);
        reject(err);
      });
  });
};
