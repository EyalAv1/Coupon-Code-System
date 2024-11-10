import axios from "axios";
import { MouseEventHandler, useState } from "react";

interface SignIn {
  onClickHandler: MouseEventHandler<HTMLInputElement> | undefined;
}

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLoginClicked = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5292/Users/IsUserValid",
        {
          params: { username: username, password: password },
        }
      );
      const token = response.data.Token;
      localStorage.setItem("UserToken", token);
    } catch (err) {
      setError("Invalid username or pasword");
    }
  };
  return (
    <div>
      <div>{error != "" ? error : null}</div>
      <div>Sign In</div>
      <form>
        <label>Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="button" value="Login" onClick={onLoginClicked} />
      </form>
    </div>
  );
}
