import { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "../../../services/AuthService";
import { User } from "../../../Models/User";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  // const [status, setStatus] = useState<string>("");

  const onClickHandler = async (e: React.FormEvent) => {
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
      console.log(res);
      // window.location.reload();
    });
  };
  return (
    <div>
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
