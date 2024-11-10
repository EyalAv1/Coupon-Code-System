import axios from "axios";
import { MouseEventHandler, useState } from "react";

interface SignIn {
  onClickHandler: MouseEventHandler<HTMLInputElement> | undefined;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLoginClicked = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5292/api/Users/IsUserValid",
        {
          params: { email: email, password: password },
        }
      );
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("UserToken", token);
    } catch (err) {
      console.log(err);
      setError("Invalid username or pasword");
    }
  };
  return (
    <div>
      <div>{error != "" ? error : null}</div>
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
