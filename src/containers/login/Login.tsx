import { useState } from "react";
import "./Login.css";
import SignIn from "../../components/auth/signIn/SignIn";
import SignUp from "../../components/auth/signUp/SignUp";
// import axios from "axios";
interface LoginProps {
  onLoginSuccess: () => void; // The function that will be called on successful login
}
// interface User {
//   id?: number;
//   username: string;
//   passwordHash: string;
// }

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const onClickHandler = async () => {
    // e.preventDefault();
    onLoginSuccess();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      onLoginSuccess();
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsSignIn(true);
        }}
      >
        Sing In
      </button>
      <button
        onClick={() => {
          setIsSignIn(false);
        }}
      >
        Sing Up
      </button>
      {isSignIn ? (
        <SignIn
          onClickHandler={onClickHandler}
        />
      ) : (
        <SignUp />
      )}
    </div>
  );
}
