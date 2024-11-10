import axios from "axios";
import { useState } from "react";

interface User {
  id?: number;
  compamyName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compantName, setCompanyName] = useState("");
  const [status, setStatus] = useState<string>("");

  const onClickHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      compamyName: compantName,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:5000/users", newUser);
      setStatus(`User added with ID: ${response.data.id}`);
    } catch (error) {
      console.error("Error adding user:", error);
      setStatus("Failed to add user");
    }
  };
  return (
    <div>
      <div>{status}</div>
      <form>
        <label>email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label>Company Name</label>
        <input type="text" onChange={(e) => setCompanyName(e.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="button" value="SignUp" onClick={onClickHandler} />
      </form>
    </div>
  );
}
