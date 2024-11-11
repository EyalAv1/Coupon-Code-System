import { useState } from "react";
import "./Login.css";
import SignIn from "../../components/auth/signIn/SignIn";
import SignUp from "../../components/auth/signUp/SignUp";

interface LoginProps {
  onLoginSuccess: () => void; // The function that will be called on successful login
}
// interface User {
//   id?: number;
//   username: string;
//   passwordHash: string;
// }

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isSignIn, setIsSignIn] = useState(true);

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
      {isSignIn ? <SignIn/> : <SignUp />}
    </div>
  );
}
