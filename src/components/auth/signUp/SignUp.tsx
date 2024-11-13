import { useState } from "react";
import { addUser } from "../../../services/AuthService";
import { User } from "../../../Models/User";
import "../signIn/SignIn.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  // const [status, setStatus] = useState<string>("");

  const onClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newUser: User = {
      CompanyName: companyName,
      Email: email,
      Password: password,
      IsAdmin: false,
    };
    addUser(newUser).then((res) => {
      if (!res) {
        throw new Error("Invalid Credentials");
      }
    });
  };
  return (
    <div className="SinInFormContainer">
      <form className="SignInForm">
        <label>
          <h2>Sign Up</h2>
        </label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={(e) => onClickHandler(e)}>Sign Up</button>
      </form>
    </div>
  );
}
