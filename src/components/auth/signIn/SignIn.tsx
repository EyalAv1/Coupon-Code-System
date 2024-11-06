import { MouseEventHandler } from "react";

interface SignIn {
  onClickHandler: MouseEventHandler<HTMLInputElement> | undefined;
}

export default function SignIn({ onClickHandler }: SignIn) {
  return (
    <div>
      <div>Sign In</div>
      <form>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <input type="button" value="Login" onClick={onClickHandler} />
      </form>
    </div>
  );
}
