import { atom, RecoilState } from "recoil";
import { IUser } from "../types/types";

export const defaultUser: IUser = {
  _id: 0,
  username: "",
  email: "",
  avatar: "",
};

const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : defaultUser;

export const userAtom: RecoilState<IUser> = atom({
  key: "userAtom",
  default: initialUser,
});
