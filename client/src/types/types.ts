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
}

export interface IComment {
  id: string;
  owner: IUser;
  comment: string;
  postId: string;
}

// const user: IUser = {
//   id: 1,
//   username: "Kermit",
//   avatar:
//     "https://i.pinimg.com/474x/db/08/0f/db080fceb9fa616315bd6f9c3b8a9632.jpg",
// };
