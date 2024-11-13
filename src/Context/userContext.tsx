import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/AuthService";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

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
    if (!token) {
      localStorage.setItem("UserToken", null!);
      return;
    }
    fetchCurrentUser(token!)
      .then((res) => {
        if (!res) {
          setToken(null);
          localStorage.setItem("UserToken", null!);
          throw new Error("User Not Found");
        }
        setCurrentUser(res.User);
        // console.log(res.User);
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
