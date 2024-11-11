import "./NavigationBar.css";
// import { Link } from "react-router-dom";
import AccountIcon from "@mui/icons-material/AccountCircle";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import CoupinLogo from "../../assets/CouponLogo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { MouseEventHandler } from "react";

interface Login {
  isLogin: boolean;
  onLogout: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export default function NavigationBar({ isLogin, onLogout }: Login) {
  console.log(isLogin);
  return (
    <div className="NavigationBarContainer">
      <img className="Logo" src={CoupinLogo} alt="Logo" />
      <div className="NavigationBarOutline">
        <a className="NavigationBarItem" href={"/"}>
          {<TicketIcon />}
        </a>
        {/* {isLogin ? (
          <a className="NavigationBarItem" href={"/adminCoupons"}>
            {<AccountIcon />}
          </a>
        ) : null} */}
        {!isLogin ? (
          <a href="/login">
            <LoginIcon />
          </a>
        ) : (
          <div>
            <a className="NavigationBarItem" href={"/adminCoupons"}>
              {<AccountIcon />}
            </a>
            <a onClick={onLogout}>
              <LogoutIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
