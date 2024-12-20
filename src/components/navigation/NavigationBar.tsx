import "./NavigationBar.css";
// import { Link } from "react-router-dom";
import AccountIcon from "@mui/icons-material/AccountCircle";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import CouponLogo from "../../assets/CouponLogo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  const { token, setToken, currentUser } = useContext(UserContext)!;

  const logOut = () => {
    setToken(null);
    navigate("/");
  };
  return (
    <div className="NavigationBarContainer">
      <img className="Logo" src={CouponLogo} alt="Logo" />
      <div className="NavigationBarOutline">
        <NavLink className="NavigationBarItem" to={"/"}>
          {<TicketIcon />}
        </NavLink>
        {!token || !currentUser ? (
          <NavLink to={"/Login"}>
            <LoginIcon />
          </NavLink>
        ) : (
          <div>
            <NavLink className="NavigationBarItem" to={"/adminCoupons"}>
              {<AccountIcon />}
            </NavLink>
            <a onClick={logOut}>
              <LogoutIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
