import { atom, RecoilState } from "recoil";
import { IUser } from "../types/types";

export const userAtom: RecoilState<IUser> = atom({
  key: "userAtom",
  default: {
    id: 0,
    username: "",
    avatar: "",
  },
});
