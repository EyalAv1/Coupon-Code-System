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

  const onLoginClicked = () => {
    loginUser(email, password)
      .then((res) => {
        if (!res) {
          throw new Error("Invalid Email or Password");
        }
        // localStorage.setItem("UserToken", res.Token);
        console.log(res.Token);
        setToken(res.Token);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div>
      <div>Sign In</div>
      <form>
        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="button" value="Login" onClick={onLoginClicked} />
      </form>
    </div>
  );
}
