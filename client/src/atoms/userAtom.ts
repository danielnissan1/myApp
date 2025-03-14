import { atom, RecoilState } from "recoil";
import { IUser } from "../types/types";

export const defaultUser: IUser = {
  _id: 0,
  username: "",
  email: "",
  avatar: "",
};

export const userAtom: RecoilState<IUser> = atom({
  key: "userAtom",
  default: defaultUser,
});
