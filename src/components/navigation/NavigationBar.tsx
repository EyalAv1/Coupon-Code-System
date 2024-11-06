import "./NavigationBar.css";
// import { Link } from "react-router-dom";
import AccountIcon from "@mui/icons-material/AccountCircle";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import CoupinLogo from "../../assets/CouponLogo.png";

export default function NavigationBar() {
  return (
    <div className="NavigationBarContainer">
      <img className="Logo" src={CoupinLogo} alt="Logo" />
      <div className="NavigationBarOutline">
        <a className="NavigationBarItem" href={"/"}>
          {<TicketIcon />}
        </a>
        <a className="NavigationBarItem" href={"/adminCoupons"}>
          {<AccountIcon />}
        </a>
      </div>
    </div>
  );
}
