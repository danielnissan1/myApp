import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { RoutesValues } from "../consts/routes";

export const useLogout = () => {
  const navigate = useNavigate();
  const [getRefreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    ""
  );

  const onLogout = () => {
    const storedRefreshToken = getRefreshToken();
    axios
      .post("http://localhost:3001/auth/logout", {
        refreshToken: storedRefreshToken,
      })
      .then((res) => {
        console.log(res.data);
        navigate(RoutesValues.LOGIN);
      })
      .catch((err) => console.log("CORS Error:", err));
  };

  return { onLogout };
};
