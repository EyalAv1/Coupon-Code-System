import { User } from "../Models/User";

const api = "http://localhost:5292/api/Users/";

export const loginUser = async (email: string, password: string) => {
  try {
    const data = await fetch(
      api + `IsUserValid?email=${email}&password=${password}`,
      {
        method: "POST",
      }
    );
    if (!data.ok) {
      throw new Error("Invalid email or password");
    }
    return data.json();
  } catch (err) {
    return null;
  }
};

export const fetchCurrentUser = async (token: string) => {
  try {
    if (!token) {
      return;
    }
    const response = await fetch(api + `me?token=${token}`, { method: "GET" });
    if (!response.ok) {
      throw new Error("User Not Found");
    }
    return response.json();
  } catch (err) {
    return null;
  }
};

export const addUser = async (user: User) => {
  try {
    const response = await fetch(api + `AddUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Invalid Credentials");
    }
    return response.json();
  } catch (err) {
    return null;
  }
};
