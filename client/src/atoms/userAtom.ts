import { atom, RecoilState } from "recoil";
import { IUser } from "../types/types";

export const defaultUser: IUser = {
  _id: 0,
  username: "",
  phoneNumber: "",
  avatar: "",
  email: "",
};

export const userAtom: RecoilState<IUser> = atom({
  key: "userAtom",
  default: defaultUser,
});
