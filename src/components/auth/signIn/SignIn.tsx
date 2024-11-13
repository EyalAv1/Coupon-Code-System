import "./SignIn.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../../services/AuthService";
import { UserContext } from "../../../Context/userContext";

export default function SignIn() {
  const navigate = useNavigate();

  const { setToken } = useContext(UserContext)!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (!res) {
          throw new Error("Invalid Email or Password");
        }
        setToken(res.Token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Email or Password");
      });
  };

  return (
    <div className="SinInFormContainer">
      <form className="SignInForm">
        <label>
          <h2>Sign In</h2>
        </label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={(e) => onLoginClicked(e)}>Login</button>
      </form>
    </div>
  );
}
