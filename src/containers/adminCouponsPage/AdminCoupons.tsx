import { useEffect, useState } from "react";
import "./AdminCoupons.css";
import AddIcon from "../../assets/add_circle.png";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const fetchCoupons = async () => {
    // fetch the coupons from the databse
    setCoupons([]);
  };
  useEffect(() => {
    fetchCoupons;
  }, []);

  const addCoupon = async () => {
    // add coupon to the database
  };
  return (
    <div>
      <div className="AddCouponBTN">
        <button onClick={addCoupon}>
          <div className="AddCouponContent">
            <img src={AddIcon} className="AddIcon"/>
            Add Coupon
          </div>
        </button>
      </div>
      <div>
        {coupons.length != 0
          ? coupons.map((item) => {
              return <div>{item}</div>;
            })
          : "No Coupons Found"}
      </div>
      {/* <CouponCardItem couponName="Test" couponCode="1234" couponDiscount={15} couponDescription="Test the coupon card"/> */}
    </div>
  );
}
