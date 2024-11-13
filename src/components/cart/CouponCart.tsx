import { Coupon } from "../../Models/Coupon";
import { updateCouponUsageCount } from "../../services/CouponsService";
import "./CouponCart.css";
import { toast } from "react-toastify";

type CartItem = {
  coupons: Array<Coupon>;
  totalPrice: number;
};
export default function CouponCart({
  coupons,
  totalPrice,
}: CartItem) {
  const onCheckoutClicked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    coupons.forEach((coupon) => {
      updateCouponUsageCount(coupon)
        .then((res) => {
          if (!res) {
            throw new Error(res);
          }
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    });
  };
  return (
    <div className="Cart">
      <div className="CartOutline">
        {coupons.map((coupon) => {
          return (
            <div key={coupon.Code} className="CartItem">
              <h2>{coupon.Code}</h2>
            </div>
          );
        })}
        <div
          className="CartCheckoutOutline"
          onClick={(e) => onCheckoutClicked(e)}
        >
          <button className="CheckoutBTN">Checkout</button>
          <div className="CartTotal">
            <h3>Total: {totalPrice} NIS</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
