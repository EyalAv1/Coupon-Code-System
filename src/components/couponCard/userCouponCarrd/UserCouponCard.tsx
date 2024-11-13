import { useEffect, useState } from "react";
import "./UserCouponCard.css";
import { getAllCoupons } from "../../../services/CouponsService";
import { Coupon, UserCouponCardType } from "../../../Models/Coupon";
import CouponUserCardItem from "./couponUserCardItem/CouponUserCardItem";

export default function UserCouponCard() {
  const [coupons, setCoupons] = useState([]);
  const getCoupons = () => {
    getAllCoupons().then((res) => {
      if (!res) {
        throw new Error("Canno get coupons from server");
      }
      console.log(res.data);
      setCoupons(
        res.data.map((coupon: Coupon) => {
          return {
            couponCode: coupon.Code,
            couponValidationDate: coupon.ExpirationDate,
          };
        })
      );
    });
  };
  useEffect(() => {
    getCoupons();
  }, []);
  return (
    <div>
      <h3>Coupons:</h3>
      <div className="UserCouponsContainer">
        {coupons.map((c: UserCouponCardType) => {
          return (
            <div key={c.couponCode}>
              <CouponUserCardItem
                couponCode={c.couponCode}
                couponValidationDate={c.couponValidationDate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
