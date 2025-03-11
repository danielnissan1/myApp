import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../consts/routes";
import { googleLogout } from "@react-oauth/google";

export const useLogout = () => {
  const navigate = useNavigate();
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  const onLogout = async () => {
    const storedRefreshToken = getRefreshToken();
    console.log("Logging out with refresh token:", storedRefreshToken);

    if (!storedRefreshToken) {
      console.warn("No refresh token found. Skipping backend logout.");
      googleLogout(); // Ensure Google session clears
      setRefreshToken(""); // Clear token from local storage
      navigate(RoutesValues.LOGIN);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:80/auth/logout",
        {
          refreshToken: storedRefreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${storedRefreshToken}`,
          },
        }
      );

      console.log("Logout success:", res.data);
      googleLogout();
      setRefreshToken("");
      navigate(RoutesValues.LOGIN);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Logout error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Logout error:", error);
      }
      // navigate(RoutesValues.LOGIN);
    }
  };

  return { onLogout };
};
