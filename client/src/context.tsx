// import { createContext } from "react";
import React, { PropsWithChildren, useEffect } from "react";
import { IPost, IUser } from "./App";

interface contextProps {
  // children: React.ReactNode;
  user: IUser;
  changeUser: (user: IUser) => void;
}

export const UserContext = React.createContext<contextProps>(
  {} as contextProps
);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<IUser>({} as IUser);

  const changeUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
