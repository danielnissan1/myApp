export interface IUser {
  id: number;
  username: string;
  avatar: string;
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
  likes: IUser[];
}

export interface IComment {
  id: string;
  owner: IUser;
  comment: string;
  postId: string;
}
