export interface IUser {
  _id: number;
  username: string;
  avatar: string;
  accessToken?: string;
  refreshToken?: string;
  email: string;
}

export interface IPost {
  _id?: string;
  owner: IUser;
  imgSrc: string;
  date: Date;
  isSold: boolean;
  content: string;
  location: string;
  price: number;
  likes: string[];
}

export interface IComment {
  id: string;
  owner: IUser;
  comment: string;
  postId: string;
}
