import { useState } from "react";
import "./Login.css";
import SignIn from "../../components/auth/signIn/SignIn";
import SignUp from "../../components/auth/signUp/SignUp";

export default function Login() {
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
