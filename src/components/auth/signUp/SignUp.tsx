import { useState } from "react";
import { addUser } from "../../../services/AuthService";
import { User } from "../../../Models/User";
import "../signIn/SignIn.css";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
} from "../../../helpers/FormValidation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  // const [status, setStatus] = useState<string>("");

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newUser: User = {
      CompanyName: companyName,
      Email: email,
      Password: password,
      IsAdmin: false,
    };
    if (validateForm()) {
      addUser(newUser)
        .then((res) => {
          if (!res) {
            throw new Error("Invalid Credentials");
          }
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      return;
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      isValid = false;
    }
    if (!companyName) {
      toast.error("Company name is required.");
      isValid = false;
    }
    if (!password || !validatePassword(password)) {
      toast.error(
        "*Password must be at least 8 characters long.\n*with at least one uppercase letter.\n*one lowercase letter, and one number."
      );
      isValid = false;
    }
    return isValid;
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
