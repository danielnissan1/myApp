import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CredentialResponse } from "@react-oauth/google";
import { IUser } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { RoutesValues } from "../consts/routes";

export const useAuth = () => {
  const setUser = useSetRecoilState(userAtom);
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    "accessToken"
  );
  const navigate = useNavigate();

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log("ppppppp", credentialResponse);
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
