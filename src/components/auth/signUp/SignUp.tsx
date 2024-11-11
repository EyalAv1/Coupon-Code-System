import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface User {
  id?: number;
  CompanyName: string;
  Email: string;
  Password: string;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<string>("");

  const onClickHandler = async (e: React.FormEvent) => {
    // e.preventDefault();
    // const newUser: User = {
    //   CompanyName: compantName,
    //   Email: email,
    //   Password: password,
    // };
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5292/api/Users/AddUser",
    //     newUser
    //   );
    //   setStatus(`User added with ID: ${response.data.user.id}`);
    //   console.log(response);
    // } catch (error) {
    //   console.error("Error adding user:", error);
    //   setStatus("Failed to add user");
    // }
    const newUser: User = {
      CompanyName: companyName,
      Email: email,
      Password: password,
    };
    await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid cradentials");
        }
        console.log("user added");
      })
      .catch((err) => {
        toast.error(err);
      });
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
