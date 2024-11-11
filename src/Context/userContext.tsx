import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/AuthService";
import { toast } from "react-toastify";

interface UserContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser: any;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | null>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("UserToken")
  );
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    // const fetchUser = async () => {
    //   if (!token) {
    //     return;
    //   }
    //   const response = await fetch(
    //     `http://localhost:5292/api/Users/me?token=${token}`,
    //     { method: "GET" }
    //   );
    //   if (!response.ok) {
    //     setToken(null);
    //     localStorage.setItem("UserToken", null!);
    //   } else {
    //     const userData = await response.json();
    //     // console.log(userData.user);
    //     setCurrentUser({ ...userData.user });
    //     console.log(currentUser);
    //     localStorage.setItem("UserToken", token!);
    //   }
    // };
    // fetchUser();
    fetchCurrentUser(token!)
      .then((res) => {
        if (!res) {
          setToken(null);
          localStorage.setItem("UserToken", null!);
          throw new Error("Useer Not Found");
        }
        setCurrentUser(res.user);
        console.log(res.user);
        localStorage.setItem("UserToken", token!);
      })
      .catch((err) => {
        toast.warning(err);
      });
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
