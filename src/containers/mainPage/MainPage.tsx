import UserCouponCard from "../../components/couponCard/userCouponCarrd/UserCouponCard";
import CouponsValidatoer from "../../components/userCouponsValidator/CouponsValidator";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div>
      <h3>
        Wondering how much discount this coupon gives you <br /> Enter your
        coupon below and find out how much discount you deserve
      </h3>
      <CouponsValidatoer />
      <UserCouponCard />
    </div>
  );
}
