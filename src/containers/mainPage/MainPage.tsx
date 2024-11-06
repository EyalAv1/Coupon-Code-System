import CouponsValidatoer from "../../components/userCouponsValidator/CouponsValidator";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div>
      <p>
        Wondering how much discount this coupon gives you <br /> Enter your
        coupon below and find out how much discount you deserve
      </p>
      <CouponsValidatoer />
    </div>
  );
}
